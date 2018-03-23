pragma solidity ^0.4.20;

library SafeMath {

  /**
  * @dev Multiplies two numbers, throws on overflow.
  */
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  /**
  * @dev Substracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

/// @title Interface for contracts conforming to ERC-721: Non-Fungible Tokens
/// @author Dieter Shirley <dete@axiomzen.co> (https://github.com/dete)
contract ERC721 {
    // Required methods
    function totalSupply() public view returns (uint256 total);
    function balanceOf(address _owner) public view returns (uint256 balance);
    function ownerOf(uint256 _tokenId) public view returns (address owner);
    function approve(address _to, uint256 _tokenId) public;
    function transfer(address _to, uint256 _tokenId) public;
    function transferFrom(address _from, address _to, uint256 _tokenId) public;

    // Events
    event Transfer(address from, address to, uint256 tokenId);
    event Approval(address owner, address approved, uint256 tokenId);

    // Optional
    // function name() public view returns (string name);
    // function symbol() public view returns (string symbol);
    // function tokensOfOwner(address _owner) external view returns (uint256[] tokenIds);
    // function tokenMetadata(uint256 _tokenId, string _preferredTransport) public view returns (string infoUrl);

    // ERC-165 Compatibility (https://github.com/ethereum/EIPs/issues/165)
    // function supportsInterface(bytes4 _interfaceID) external view returns (bool);
}

contract CryptoThreeKingdoms is ERC721{
  using SafeMath for uint256;

  event Bought (uint256 indexed _tokenId, address indexed _owner, uint256 _price);
  event Sold (uint256 indexed _tokenId, address indexed _owner, uint256 _price);
  event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
  event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);

  address private owner;
  mapping (address => bool) private admins;

  uint256 private increaseLimit1 = 0.02 ether;
  uint256 private increaseLimit2 = 0.5 ether;
  uint256 private increaseLimit3 = 2.0 ether;
  uint256 private increaseLimit4 = 5.0 ether;

  uint256[] private listedTokens;
  mapping (uint256 => address) private ownerOfToken;
  mapping (uint256 => uint256) private priceOfToken;
  mapping (uint256 => uint256) private free1OfToken;
  mapping (uint256 => uint256) private free2OfToken;
  mapping (uint256 => address) private approvedOfToken;

  function CryptoThreeKingdoms () public {
    owner = msg.sender;
    admins[owner] = true;    
  }

  /* Modifiers */
  modifier onlyOwner() {
    require(owner == msg.sender);
    _;
  }

  modifier onlyAdmins() {
    require(admins[msg.sender]);
    _;
  }

  /* Owner */
  function setOwner (address _owner) onlyOwner() public {
    owner = _owner;
  }

  function addAdmin (address _admin) onlyOwner() public {
    admins[_admin] = true;
  }

  function removeAdmin (address _admin) onlyOwner() public {
    delete admins[_admin];
  }

  /* Withdraw */
  /*
    NOTICE: These functions withdraw the developer's cut which is left
    in the contract by `buy`. User funds are immediately sent to the old
    owner in `buy`, no user funds are left in the contract.
  */
  function withdrawAll () onlyAdmins() public {
   msg.sender.transfer(this.balance);
  }

  function withdrawAmount (uint256 _amount) onlyAdmins() public {
    msg.sender.transfer(_amount);
  }

  /* Buying */
  function calculateNextPrice (uint256 _price) public view returns (uint256 _nextPrice) {
    if (_price < increaseLimit1) {
      return _price.mul(200).div(95);
    } else if (_price < increaseLimit2) {
      return _price.mul(135).div(96);
    } else if (_price < increaseLimit3) {
      return _price.mul(125).div(97);
    } else if (_price < increaseLimit4) {
      return _price.mul(117).div(97);
    } else {
      return _price.mul(115).div(98);
    }
  }

  function calculateDevCut (uint256 _price) public view returns (uint256 _devCut) {
     return _price.div(20);
  }

  /*
     Buy a country directly from the contract for the calculated price
     which ensures that the owner gets a profit.  All countries that
     have been listed can be bought by this method. User funds are sent
     directly to the previous owner and are never stored in the contract.
  */
  function buy (uint256 _tokenId) payable public {
    require(priceOf(_tokenId) > 0);
    require(ownerOf(_tokenId) != address(0));
    require(msg.value >= priceOf(_tokenId));
    require(ownerOf(_tokenId) != msg.sender);
    require(!isContract(msg.sender));
    require(msg.sender != address(0));
    require(now >= free1OfToken[_tokenId]);
    require(now <= free2OfToken[_tokenId]);

    address oldOwner = ownerOf(_tokenId);
    address newOwner = msg.sender;
    uint256 price = priceOf(_tokenId);
    uint256 excess = msg.value.sub(price);

    _transfer(oldOwner, newOwner, _tokenId);
    priceOfToken[_tokenId] = nextPriceOf(_tokenId);

    Bought(_tokenId, newOwner, price);
    Sold(_tokenId, oldOwner, price);

    // Devevloper's cut which is left in contract and accesed by
    // `withdrawAll` and `withdrawAmountTo` methods.
    uint256 devCut = calculateDevCut(price);

    // Transfer payment to old owner minus the developer's cut.
    oldOwner.transfer(price.sub(devCut));

    if (excess > 0) {
      newOwner.transfer(excess);
    }
  }

  /* ERC721 */

  function name() public view returns (string name) {
    return "www.cryptohero.pro";
  }

  function symbol() public view returns (string symbol) {
    return "CHO";
  }

  function totalSupply() public view returns (uint256 _totalSupply) {
    return listedTokens.length;
  }

  function balanceOf (address _owner) public view returns (uint256 _balance) {
    uint256 counter = 0;

    for (uint256 i = 0; i < listedTokens.length; i++) {
      if (ownerOf(listedTokens[i]) == _owner) {
        counter++;
      }
    }

    return counter;
  }

  function ownerOf (uint256 _tokenId) public view returns (address _owner) {
    return ownerOfToken[_tokenId];
  }

  function tokensOf (address _owner) public view returns (uint256[] _tokenIds) {
    uint256[] memory Tokens = new uint256[](balanceOf(_owner));

    uint256 TokenCounter = 0;
    for (uint256 i = 0; i < listedTokens.length; i++) {
      if (ownerOf(listedTokens[i]) == _owner) {
        Tokens[TokenCounter] = listedTokens[i];
        TokenCounter += 1;
      }
    }

    return Tokens;
  }

  function tokenExists (uint256 _tokenId) public view returns (bool _exists) {
    return priceOf(_tokenId) > 0;
  }

  function approvedFor(uint256 _tokenId) public view returns (address _approved) {
    return approvedOfToken[_tokenId];
  }

  function approve(address _to, uint256 _tokenId) public {
    require(msg.sender != _to);
    require(tokenExists(_tokenId));
    require(ownerOf(_tokenId) == msg.sender);

    if (_to == 0) {
      if (approvedOfToken[_tokenId] != 0) {
        delete approvedOfToken[_tokenId];
        Approval(msg.sender, 0, _tokenId);
      }
    } else {
      approvedOfToken[_tokenId] = _to;
      Approval(msg.sender, _to, _tokenId);
    }
  }

  /* Transferring a country to another owner will entitle the new owner the profits from `buy` */
  function transfer(address _to, uint256 _tokenId) public {
    require(msg.sender == ownerOf(_tokenId));
    _transfer(msg.sender, _to, _tokenId);
  }

  function transferFrom(address _from, address _to, uint256 _tokenId) public {
    require(approvedFor(_tokenId) == msg.sender);
    _transfer(_from, _to, _tokenId);
  }

  function _transfer(address _from, address _to, uint256 _tokenId) internal {
    require(tokenExists(_tokenId));
    require(ownerOf(_tokenId) == _from);
    require(_to != address(0));
    require(_to != address(this));

    ownerOfToken[_tokenId] = _to;
    approvedOfToken[_tokenId] = 0;

    Transfer(_from, _to, _tokenId);
  }

  /* Read */
  function isAdmin (address _admin) public view returns (bool _isAdmin) {
    return admins[_admin];
  }

  function priceOf (uint256 _tokenId) public view returns (uint256 _price) {
    return priceOfToken[_tokenId];
  }

  function free1Of (uint256 _tokenId) public view returns (uint256 _free1) {
    return free1OfToken[_tokenId];
  }
  
  function free2Of (uint256 _tokenId) public view returns (uint256 _free2) {
      return free2OfToken[_tokenId];
  }

  function nextPriceOf (uint256 _tokenId) public view returns (uint256 _nextPrice) {
    return calculateNextPrice(priceOf(_tokenId));
  }

  function allOf (uint256 _tokenId) external view returns (address _owner, uint256 _price, uint256 _nextPrice, uint256 _free1, uint256 _free2) {
    return (ownerOf(_tokenId), priceOf(_tokenId), nextPriceOf(_tokenId), free1Of(_tokenId), free2Of(_tokenId));
  }

  function TokensForSaleLimit (uint256 _from, uint256 _take) public view returns (uint256[] _Tokens) {
    uint256[] memory Tokens = new uint256[](_take);

    for (uint256 i = 0; i < _take; i++) {
      Tokens[i] = listedTokens[_from + i];
    }

    return Tokens;
  }

  /* Util */
  function isContract(address addr) internal view returns (bool) {
    uint size;
    assembly { size := extcodesize(addr) } // solium-disable-line
    return size > 0;
  }
  
  function changePrice(uint256 _tokenId, uint256 _price, uint256 frozen1, uint256 frozen2) {
    require(_price >= 0);
    require(msg.sender == ownerOfToken[_tokenId]);
    require(now > free2OfToken[_tokenId]);
    priceOfToken[_tokenId] = _price;
    free1OfToken[_tokenId] = now + frozen1;
    free2OfToken[_tokenId] = now + frozen1 + frozen2;
  }
  
  function luckyIssue(address _addr, uint256 _tokenId, uint256 _price, uint256 _tokenRatio) onlyAdmins() public {
      require(ownerOfToken[_tokenId] == address(0));
      require(_price > 0);
      ownerOfToken[_tokenId] = _addr;
      priceOfToken[_tokenId] = _price;
      free1OfToken[_tokenId] = free2OfToken[_tokenId] = now;
      listedTokens.push(_tokenId);
      
      IMsg imsg = IMsg(_addr);
      imsg.putIntoPackage(_tokenId, _tokenRatio);
  }
  
  function issueCard(uint256 l, uint256 r, uint256 price, uint256 frozen1, uint256 frozen2) onlyAdmins() public {
    for (uint256 i = l; i <= r; i++) {
      require(ownerOf(i) == address(0));
      require(price > 0);
      ownerOfToken[i] = msg.sender;
      priceOfToken[i] = price;
      free1OfToken[i] = now + frozen1;
      free2OfToken[i] = now + frozen1 + frozen2;
      listedTokens.push(i);
    }      
   }  
}   

interface IMsg {
    function putIntoPackage(uint256 _tokenId, uint256 _ratio) public;
}

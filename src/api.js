import Promise from 'bluebird';
import Cookie from 'js-cookie';
import web3 from '@/web3';
import * as config from '@/config';
import request from 'superagent';
import timeout from 'timeout-then';
import contractABI from './abi/contract.json';
import DecentralizedExchangeHotPotatoABI from './abi/DecentralizedExchangeHotPotato.json';
import LuckyPackageABI from './abi/LuckyPackage.json';

// Sometimes, web3.version.network might be undefined,
// as a workaround, use defaultNetwork in that case.
const network = config.network[web3.version.network] || config.defaultNetwork;
const sponsorTokenContract = web3.eth.contract(contractABI).at(network.contract);
const DecentralizedExchangeHotPotatoContract = web3.eth
  .contract(DecentralizedExchangeHotPotatoABI)
  .at(network.DecentralizedExchangeHotPotato);
const LuckyPackageContract = web3.eth.contract(LuckyPackageABI).at(network.LuckyPackage);

let store = [];
let isInit = false;


export const init = async () => {
  await request
    .get('https://api.leancloud.cn/1.1/classes/ad')
    .set(config.leanCloudKey)
    .type('json')
    .accept('json')
    .then((response) => {
      if (response.body && response.body.results) {
        store = response.body.results;
      }
      isInit = true;
    });
};

init().then();

export const getMe = async () => {
  if (!window.web3) {
    throw Error('NO_METAMASK');
  }
  const me = {};
  me.address = (await Promise.promisify(web3.eth.getAccounts)())[0];

  if (me.address) {
    me.balance = await Promise.promisify(web3.eth.getBalance)(me.address);
    return me;
  }
  throw Error('METAMASK_LOCKED');
};

export const getAnnouncements = async () => {
  const response = await request
    .get('https://api.leancloud.cn/1.1/classes/announcement')
    .set(config.leanCloudKey)
    .type('json')
    .accept('json');

  if (response.body && response.body.results) {
    return response.body.results;
  }

  return [];
};

export const getGg = async (id, time = 0) => {
  if (!isInit) {
    return timeout((time + 1) * 500).then(() => getGg(id, time + 1));
  }

  const item = store.find(x => x.id === `${id}`);

  if (item && item.str) {
    return item.str;
  }

  return '';
};

export const setGg = async (id, str) => {
  const response = await request
    .get('https://api.leancloud.cn/1.1/classes/ad')
    .set(config.leanCloudKey)
    .type('json')
    .accept('json');
  if (response.body && response.body.results) {
    store = response.body.results;
  }
  const item = store.find(x => x.id === `${id}`);

  if (item) {
    // update request
    await request
      .put(`https://api.leancloud.cn/1.1/classes/ad/${item.objectId}`)
      .set(config.leanCloudKey)
      .type('json')
      .accept('json')
      .send({
        str
      });
    // update store
    item.str = str;
  } else {
    // create request
    await request
      .post('https://api.leancloud.cn/1.1/classes/ad')
      .set(config.leanCloudKey)
      .type('json')
      .accept('json')
      .send({
        id: `${id}`,
        str
      });
    // update store
    await init();
  }

  return str;
};

// 获取此卡片的推荐nextPrice，需要和卡片blockchain上的nextPrice进行比较，选择较大的创建交易
export const getNextPrice = async (id, time = 0) => {
  if (!isInit) {
    if (time >= 1500) {
      return 0;
    }

    return timeout((time + 1) * 500).then(() => getNextPrice(id, time + 1));
  }

  const item = store.find(x => x.id === `${id}`);

  if (item && item.nextPrice) {
    // Convert nextPrice from 'ether' to 'wei'
    return web3.toWei(item.nextPrice, 'ether');
  }

  return 0;
};

// price为用户成功发起交易的交易价格，调用setNextPrice后，nextPrice会变为此价格的1.1倍
export const setNextPrice = async (id, priceInWei) => {
  // Convert price(Wei) to a number instance (ether)
  const price = Number(web3.fromWei(priceInWei, 'ether').toString());
  const response = await request
    .get('https://api.leancloud.cn/1.1/classes/ad')
    .set(config.leanCloudKey)
    .type('json')
    .accept('json');
  if (response.body && response.body.results) {
    store = response.body.results;
  }
  const item = store.find(x => x.id === `${id}`);

  if (item) {
    if (price <= item.nextPrice) {
      return item.nextPrice;
    }

    // update request
    await request
      .put(`https://api.leancloud.cn/1.1/classes/ad/${item.objectId}`)
      .set(config.leanCloudKey)
      .type('json')
      .accept('json')
      .send({
        nextPrice: price * 1.1
      });
    // update store
    item.nextPrice = price * 1.1;
  } else {
    // create request
    await request
      .post('https://api.leancloud.cn/1.1/classes/ad')
      .set(config.leanCloudKey)
      .type('json')
      .accept('json')
      .send({
        id: `${id}`,
        nextPrice: price * 1.1
      });
    // update store
    await init();
  }

  return price * 1.1;
};

export const setPrice = (id, price) =>
  new Promise((resolve, reject) => {
    sponsorTokenContract.changePrice(
      id,
      price,
      {
        value: 0,
        gasPrice: 1000000000 * 5 // be nice
      },
      (err, result) => (err ? reject(err) : resolve(result)),
    );
  });

export const getItem = async (id) => {
  const item = config.items[id] || {};
  // format
  item.id = id;
  item.imageUrl = `http://static.togetthere.cn/${item.image_name}`;
  item.title = item.姓名;
  item.attributes = ['特技', '势力', '统御', '武力', '智力', '政治', '魅力', '统武和', '统武智和', '综合', '性别', '性格', '出生', '死亡', '枪兵', '戬兵', '弩兵', '骑兵', '武器', '水军', '出身']
    .map(v => ({
      name: v,
      value: item[v]
    }));
  item.bio = item.生平;

  // item.tokenExist = await Promise.promisify(sponsorTokenContract.tokenExists)(id);
  // if (!item.tokenExist) return item;

  item.owner =
    await Promise.promisify(sponsorTokenContract.ownerOf)(id);
  // format to ETH
  item.price = 999 * 1e+18;
  item.priceInETH = ' --';// 999;
  // todo：后面读取交易合约里面的价格
  return item;
};

export const buyItem = (id, price) => new Promise((resolve, reject) => {
  sponsorTokenContract.buy(id, {
    value: price, // web3.toWei(Number(price), 'ether'),
    gasPrice: 1000000000 * 5
  },
  (err, result) => (err ? reject(err) : resolve(result)));
});

export const getTotal = () => Promise.promisify(sponsorTokenContract.totalSupply)();

export const getItemIds = async (offset, limit) => {
  const ids = await Promise.promisify(sponsorTokenContract.itemsForSaleLimit)(offset, limit);
  return ids.sort((a, b) => a - b);
};

export const getItemsOf = async (address) => {
  const ids = await Promise.promisify(sponsorTokenContract.tokensOf)(address);
  const items = await Promise.all(ids.map(id => getItem(id)));
  return items;
};

export const getItems = async () => {
  const ids = await Promise.promisify(sponsorTokenContract.getListedTokens)();
  const items = await Promise.all(ids.map(id => getItem(id)));
  return items;
};

export const getNetwork = async () => {
  const netId = await Promise.promisify(web3.version.getNetwork)();
  return config.network[netId];
};

export const createToken = async ({ price, frozen1, frozen2, parentId }) =>
  new Promise((resolve, reject) => {
    sponsorTokenContract.issueToken(web3.toWei(Number(price), 'ether'), frozen1, frozen2, parentId, {
      // value: price, // web3.toWei(Number(price), 'ether'),
      gasPrice: 1000000000 * 5
    },
    (err, result) => (err ? reject(err) : resolve(result)));
  });

// No longer use Axios
export const getPackTx = async (from) => {
  const api = network.getPackTxApi;
  const params = Object.assign({}, network.apiParams, network.params);

  let extraParams = {};
  if (from) {
    const full64From = from.replace(/^0x/i, `0x${'0'.repeat(66 - from.length)}`);
    extraParams = Object.assign({ topic2: full64From, topic0_2_opr: 'and' }, extraParams);
  }
  const response = await request.get(api).query(params).query(extraParams);
  const result = response.body.result;
  if (!Array.isArray(result)) {
    return [];
  }
  return result.map(({ transactionHash, data, timeStamp, topics }) => {
    const prizeId = parseInt(data, 16);
    const item = config.items[prizeId] || {};
    return {
      txHash: transactionHash,
      from: topics[2].replace(/0x0+/i, '0x'),
      date: new Date(parseInt(timeStamp, 16) * 1000),
      prize: {
        id: prizeId,
        title: item.姓名
      }
    };
  });
};

export const getLocale = async () => (
  Cookie.get('locale') ||
  (
    navigator.language ||
    navigator.browserLanguage ||
    navigator.userLanguage
  ).toLowerCase()
);

export const setLocale = async (locale) => {
  Cookie.set('locale', locale, { expires: 365 });
};

export const getHotPotatoExchange = async (id) => {
  const item = {};
  [item.creator, item.owner, item.issuer,
    item.tokenid, item.price, item.free1, item.free2] = await Promise.promisify(DecentralizedExchangeHotPotatoContract.allOf)(id);
  item.Exchangeid = id;
  return item;
};

export const allOfHotPotatoExchange = async (id, contractAddress) => {
  const total = await Promise.promisify(DecentralizedExchangeHotPotatoContract.totalOrder)();
  const rangeArray = (start, end) => Array((end - start) + 1).fill(0).map((v, i) => i + start);
  const ids = rangeArray(0, Number(total) - 1);
  const items = await Promise.all(ids.map(_id => getHotPotatoExchange(_id)));
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].issuer === contractAddress && items[i].tokenid === id) {
      return items[i];
    }
  }
  return {};
};

export const isApproved = async (id) => {
  const t = await Promise.promisify(LuckyPackageContract.approvedFor)(id);
  if (t !== '0x0000000000000000000000000000000000000000') {
    return true;
  }
  return false;
};

export const getLuckyToken = async (id) => {
  const item = {};
  item.id = Number(id);
  item.owner = (await Promise.promisify(LuckyPackageContract.allOf)(id));
  item.approved = await isApproved(id);
  return item;
};

// 获取某人所拥有的LuckyToken
export const getLuckTokensOf = async (address) => {
  const ids = await Promise.promisify(LuckyPackageContract.tokensOf)(address);
  const luckyTokens = await Promise.all(ids.map(id => getLuckyToken(id)));
  // luckyTokens[0] = {
  //   id: 1,
  //   owner: '0xx9999999999',
  // };
  // luckyTokens[1] = {
  //   id: 2,
  //   owner: '91282121',
  // };
  return luckyTokens;
};
// 获取某人所拥有的LuckyToken张数
export const getLuckTokensOfLength = async (address) => {
  const ids = await Promise.promisify(LuckyPackageContract.tokensOf)(address);
  return ids.length;
};
// 获取某个拍卖（auction）
export const getLuckyTokenAuction = async (id) => {
  const ID = Number(id);
  const auction = { ID };
  [auction.creator,
    auction.owner,
    auction.issuer,
    auction.tokenId,
    auction.price,
    auction.startTime,
    auction.endTime] = await Promise.promisify(DecentralizedExchangeHotPotatoContract.allOf)(ID);
  auction.Exchangeid = Number(ID);
  auction.tokenId = Number(auction.tokenId);
  auction.startTime *= 1000;
  auction.endTime *= 1000;
  const now = new Date().getTime();
  if (now < auction.startTime) {
    auction.status = 'FROZEN'; // 未开始
  } else if (now < auction.endTime) {
    auction.status = 'SELLING';// 拍卖中
  } else {
    auction.status = 'EXPIRED';// 过期了
  }
  auction.priceInETH = web3.fromWei(auction.price, 'ether').toFixed(2);
  return auction;
};
// 获取市场上（在售）的所有的拍卖
export const getAllLuckyTokenAuctions = async () => {
  const rangeArray = (start, end) => Array((end - start) + 1).fill(0).map((v, i) => i + start);
  const total = await Promise.promisify(DecentralizedExchangeHotPotatoContract.totalOrder)();
  const ids = rangeArray(0, total - 1);
  const auctions = await Promise.all(ids.map(id => getLuckyTokenAuction(id)));
  return auctions;
};

export const buyLuckyToken = (id, price) => new Promise((resolve, reject) => {
  DecentralizedExchangeHotPotatoContract.buy(id, {
    value: price, // web3.toWei(Number(price), 'ether'),
    gasPrice: 1000000000 * 5
  },
  (err, result) => (err ? reject(err) : resolve(result)));
});
export const rollDice = luckyTokenId => new Promise((resolve, reject) => {
  LuckyPackageContract.rollDice(luckyTokenId, {
    value: 0,
    gasPrice: 1000000000 * 5
  },
  (err, result) => (err ? reject(err) : resolve(result)));
});

export const createAuction = ({
  tokenId,
  price,
  startTime, endTime }) => new Promise((resolve, reject) => {
  DecentralizedExchangeHotPotatoContract.put(network.LuckyPackage, tokenId, price,
    startTime, endTime, {
      value: 0,
      gasPrice: 1000000000 * 5
    },
    (err, result) => (err ? reject(err) : resolve(result)));
});

export const revokeAuction = id => new Promise((resolve, reject) => {
  DecentralizedExchangeHotPotatoContract.revoke(id, {
    value: 0,
    gasPrice: 1000000000 * 5
  },
  (err, result) => (err ? reject(err) : resolve(result)));
});

export const getPackage = async () => {
  const [ids, ratios, addrs] = await Promise.promisify(LuckyPackageContract.getAllPackage)();
  // ids = [1, 2, 3];
  // ratios = [1.1, 2.2, 3.3];
  console.log(addrs);
  const items = await Promise.all(ids.map(id => getItem(id)));

  items.forEach((element, index) => {
    element.ratio = ratios[index];
  });

  let z = 0;
  items.forEach((element, index) => {
    z += parseInt(ratios[index], 10);
  });

  items.forEach((element) => {
    element.sigmaRatio = z;
  });

  return items;
};


export const getPackageSize = async () => {
  const size = await Promise.promisify(LuckyPackageContract.getAllPackage)();
  return Number(size[0].length);
};

export const approveD = luckyTokenId => new Promise((resolve, reject) => {
  LuckyPackageContract.approve(network.DecentralizedExchangeHotPotato, luckyTokenId, {
    value: 0,
    gasPrice: 1000000000 * 5
  },
  (err, result) => (err ? reject(err) : resolve(result)));
});

export const eventRollDice = sponsorTokenContract.Transfer();

export const transfer = ({ to, tokenId }) => new Promise((resolve, reject) => {
  if (web3.isAddress(to.toLowerCase())) {
    LuckyPackageContract.transfer(to, tokenId, {
      value: 0,
      gasPrice: 1000000000 * 5
    },
    (err, result) => (err ? reject(err) : resolve(result)));
  } else {
    alert('请输入正确的赠送地址!');
  }
});

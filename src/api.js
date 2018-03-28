import Promise from 'bluebird';
import Cookie from 'js-cookie';
import web3 from '@/web3';
import * as config from '@/config';
import request from 'superagent';
import timeout from 'timeout-then';
import sponsorTokenABI from './abi/sponsorToken.json';
import sanguoABI from './abi/sanguoToken.json';

// Sometimes, web3.version.network might be undefined,
// as a workaround, use defaultNetwork in that case.
const network = config.network[web3.version.network] || config.defaultNetwork;
const sponsorTokenContract = web3.eth.contract(sponsorTokenABI).at(network.contract);


const sanguoTokenContract = web3.eth.contract(sanguoABI).at(network.package_contract);


let store = [];
let isInit = false;


export const init = async () => {
  await request
    .get('https://api.leancloud.cn/1.1/classes/ad')
    .set({
      'X-LC-Id': 'R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz',
      'X-LC-Key': '8R6rGgpHa0Y9pq8uO53RAPCB',
    })
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
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((error, accounts) => {
      const address = accounts[0];
      if (address) {
        return resolve({ address });
      }
      return reject(new Error('METAMASK_LOCKED'));
    });
  });
};

export const getAnnouncements = async () => {
  const response = await request
    .get('https://api.leancloud.cn/1.1/classes/announcement')
    .set({
      'X-LC-Id': 'R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz',
      'X-LC-Key': '8R6rGgpHa0Y9pq8uO53RAPCB',
    })
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
    .set({
      'X-LC-Id': 'R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz',
      'X-LC-Key': '8R6rGgpHa0Y9pq8uO53RAPCB',
    })
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
      .set({
        'X-LC-Id': 'R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz',
        'X-LC-Key': '8R6rGgpHa0Y9pq8uO53RAPCB',
      })
      .type('json')
      .accept('json')
      .send({
        str,
      });
    // update store
    item.str = str;
  } else {
    // create request
    await request
      .post('https://api.leancloud.cn/1.1/classes/ad')
      .set({
        'X-LC-Id': 'R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz',
        'X-LC-Key': '8R6rGgpHa0Y9pq8uO53RAPCB',
      })
      .type('json')
      .accept('json')
      .send({
        id: `${id}`,
        str,
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
    .set({
      'X-LC-Id': 'R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz',
      'X-LC-Key': '8R6rGgpHa0Y9pq8uO53RAPCB',
    })
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
      .set({
        'X-LC-Id': 'R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz',
        'X-LC-Key': '8R6rGgpHa0Y9pq8uO53RAPCB',
      })
      .type('json')
      .accept('json')
      .send({
        nextPrice: price * 1.1,
      });
    // update store
    item.nextPrice = price * 1.1;
  } else {
    // create request
    await request
      .post('https://api.leancloud.cn/1.1/classes/ad')
      .set({
        'X-LC-Id': 'R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz',
        'X-LC-Key': '8R6rGgpHa0Y9pq8uO53RAPCB',
      })
      .type('json')
      .accept('json')
      .send({
        id: `${id}`,
        nextPrice: price * 1.1,
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
        gas: 220000,
        gasPrice: 1000000000 * 66, // be nice
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
      value: item[v],
    }));
  item.bio = item.生平;

  // item.tokenExist = await Promise.promisify(sponsorTokenContract.tokenExists)(id);
  // if (!item.tokenExist) return item;

  item.owner =
    await Promise.promisify(sponsorTokenContract.ownerOf)(id);
  // format to ETH
  item.price = 999*1e+18
  item.priceInETH = 999
  //todo：后面读取交易合约里面的价格
  return item;
};

export const buyItem = (id, price) => new Promise((resolve, reject) => {
  sponsorTokenContract.buy(id, {
    value: price, // web3.toWei(Number(price), 'ether'),
    gas: 220000,
    gasPrice: 1000000000 * 100,
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
      gas: 220000,
      gasPrice: 1000000000 * 100,
    },
    (err, result) => (err ? reject(err) : resolve(result)));
  });

export const getPackTx = async () => {
  const mockData = Array.from(Array(10), () => ({
    txHash: '0x290f7f294cdbfba103d491903218dadc97c4ba148615d31ffbeceac7a47879fb',
    from: '0x23jfsdfj87371fdsxd',
    date: new Date().getTime(),
    status: 'PENDING',
  }));
  return mockData;
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

export const getLuckyToken = async (id) => {
  const item = { id: Number(id) };
  [item.owner, item.price, item.nextPrice, item.free1, item.free2] =
    await Promise.promisify(sanguoTokenContract.allOf)(id);
  // format to ETH
  item.priceInETH = web3.fromWei(item.price, 'ether').toFixed(2);
  return item;
};

export const getLuckTokensOf = async (address) => {
  const ids = await Promise.promisify(sanguoTokenContract.tokensOf)(address);
  const luckyTokens = await Promise.all(ids.map(id => getLuckyToken(id)));
  return luckyTokens;
};

export const getAllLuckyTokens = async () => {
  const total = await Promise.promisify(sanguoTokenContract.totalSupply)();
  const ids = await Promise.promisify(sanguoTokenContract.TokensForSaleLimit)(0, total);
  const tokens = await Promise.all(ids.map(id => getLuckyToken(id)));
  return tokens;
};

export const buyLuckyToken = (id, price) => new Promise((resolve, reject) => {
  sanguoTokenContract.buy(id, {
    value: price, // web3.toWei(Number(price), 'ether'),
    gas: 220000,
    gasPrice: 1000000000 * 100,
  },
  (err, result) => (err ? reject(err) : resolve(result)));
});

export const rollDice = luckyTokenId => new Promise((resolve, reject) => {
  sanguoTokenContract.rollDice(luckyTokenId, {
    value: 0,
    gas: 220000,
    gasPrice: 1000000000 * 100,
  },
  (err, result) => (err ? reject(err) : resolve(result)));
});

export const getPackage = async () => {
  let ids,
    ratios,
    addrs;

  [ids, ratios, addrs] = await Promise.promisify(sanguoTokenContract.getAllPackage)(100000);
  // ids = [1, 2, 3];
  // ratios = [1.1, 2.2, 3.3];
  const items = await Promise.all(ids.map(id => getItem(id)));

  items.forEach((element, index) => {
    element.ratio = ratios[index];
  });

  var z = 0;
  items.forEach((element, index) => {
    z += parseInt(ratios[index]);
  });

  items.forEach((element, index) => {
    element.sigmaRatio = z;
  });

  return items;
};




export const getPackageSize = async () => {
  const size = await Promise.promisify(sanguoTokenContract.packageSize)();
  return Number(size);
};

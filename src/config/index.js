/* eslint-disable import/prefer-default-export */
import itemsData from '../../static/new_heroes.json';

export const network = {
  1: {
    default: true,
    name: 'Main Ethereum Network',
    contract: '0x9f87c89d4b96628f3f5bc6ab981bab71997d99bb',
    LuckyPackage: '0x8b481c5af4734501ea8b6a0c3502e001dd883d3d',
    DecentralizedExchangeHotPotato: '0x46cefba4dd7512b2449e1ac4b730bfb7f77d1407',
    rpc: 'https://mainnet.infura.io/lTETGFVyQX99UKQ98BN4',
    // No More Hard Encoded Params, use .query() instead for coding readability
    getPackTxApi: 'https://api.etherscan.io/api',
    params: {
      module: 'logs',
      action: 'getLogs',
      fromBlock: 4000,
      toBlock: 'latest'
    },
    apiParams: {
      address: '0x9f87c89d4b96628f3f5bc6ab981bab71997d99bb',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic0_1_opr: 'and',
      topic1: '0x0000000000000000000000008b481c5af4734501ea8b6a0c3502e001dd883d3d',
      apikey: 'YourApiKeyToken'
    }
  },
  2: {
    name: 'Morden Test Network',
    contract: ''
  },
  3: {
    // default: true, // It will be used when no metaMask
    name: 'Ropsten Test Network',
    contract: '0xd17c1d983030970a8b55f2df647aa351f71430e6',
    LuckyPackage: '0xc5f73d596378ec0535cf0fdb16eb6fc13d966978',
    DecentralizedExchangeHotPotato: '0x4a11d94715194d602f9ec570e446e33bf9e41fed',
    rpc: 'https://ropsten.infura.io/lTETGFVyQX99UKQ98BN4'
  },
  4: {
    name: 'Rinkeby Test Network',
    contract: '',
    rpc: 'https://rinkeby.infura.io/lTETGFVyQX99UKQ98BN4'
  },
  42: {
    // default: true,
    name: 'Kovan Test Network',
    contract: '0x88b194b61bb0c2f84ba7acad53b54f2cbe05a425',
    LuckyPackage: '0xb760ada4f12e5d29eff2d9eef3bca94b574a1f2f',
    DecentralizedExchangeHotPotato: '0xd36b2fe3d8ac6e784dc4bba9c40c360a43890050',
    rpc: 'https://kovan.infura.io/lTETGFVyQX99UKQ98BN4',
    getPackTxApi: 'https://kovan.etherscan.io/api',
    params: {
      module: 'logs',
      action: 'getLogs',
      fromBlock: 4000,
      toBlock: 'latest'
    },
    apiParams: {
      address: '0x88b194b61bb0c2f84ba7acad53b54f2cbe05a425',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic0_1_opr: 'and',
      topic1: '0x000000000000000000000000b760ada4f12e5d29eff2d9eef3bca94b574a1f2f',
      apikey: 'YourApiKeyToken'
    }
  },
  5: {
    // default: true,
    name: 'Private Network',
    contract: '0x828a929fc03cacf7e5ff09771d8ae9d5ca17344d',
    LuckyPackage: '0x58a84ee22f8e6f371db58393b9d65420cf068573',
    DecentralizedExchangeHotPotato: '0xcb5f7224dd08e4d37a350637185b8a1be17359a1',
    rpc: 'http://127.0.0.1:7546'
  }
};

export const defaultNetwork = Object.values(network).find(net => net.default);

export const i18n = [{
  langDisplay: '中文',
  locale: 'zh',
  aliases: ['zh', 'zh-cn', 'zh-hk', 'zh-sg', 'zh-tw']
},
{
  langDisplay: 'English',
  locale: 'en',
  aliases: ['en', 'en-us', 'en-au', 'en-bz', 'en-ca', 'en-ie', 'en-jm', 'en-nz', 'en-ph', 'en-za', 'en-tt', 'en-gb', 'en-zw']
},
{
  langDisplay: '日本語',
  locale: 'jp',
  aliases: ['jp']
}
];

export const items = itemsData;

export const leanCloudKey = {
  'X-LC-Id': 'R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz',
  'X-LC-Key': '8R6rGgpHa0Y9pq8uO53RAPCB'
};

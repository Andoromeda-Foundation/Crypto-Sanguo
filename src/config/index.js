/* eslint-disable import/prefer-default-export */
import itemsData from '../../static/new_heroes.json';

export const network = {
  1: {
    name: 'Main Ethereum Network',
    contract: '',
    rpc: 'https://mainnet.infura.io/lTETGFVyQX99UKQ98BN4',
  },
  2: {
    name: 'Morden Test Network',
    contract: '',
  },
  3: {
    // default: true, // It will be used when no metaMask
    name: 'Ropsten Test Network',
    contract: '0xd17c1d983030970a8b55f2df647aa351f71430e6',
    LuckyPackage: '0xc5f73d596378ec0535cf0fdb16eb6fc13d966978',
    DecentralizedExchangeHotPotato: '0x4a11d94715194d602f9ec570e446e33bf9e41fed',
    rpc: 'https://ropsten.infura.io/lTETGFVyQX99UKQ98BN4',
  },
  4: {
    name: 'Rinkeby Test Network',
    contract: '',
    rpc: 'https://rinkeby.infura.io/lTETGFVyQX99UKQ98BN4',
  },
  42: {
    default: true,
    name: 'Kovan Test Network',
    contract: '0x88b194b61bb0c2f84ba7acad53b54f2cbe05a425',
    LuckyPackage: '0xb760ada4f12e5d29eff2d9eef3bca94b574a1f2f',
    DecentralizedExchangeHotPotato: '0xd36b2fe3d8ac6e784dc4bba9c40c360a43890050',
    rpc: 'https://kovan.infura.io/lTETGFVyQX99UKQ98BN4',
  },
  5: {
    // default: true,
    name: 'Private Network',
    contract: '0x828a929fc03cacf7e5ff09771d8ae9d5ca17344d',
    LuckyPackage: '0x58a84ee22f8e6f371db58393b9d65420cf068573',
    DecentralizedExchangeHotPotato: '0xcb5f7224dd08e4d37a350637185b8a1be17359a1',
    rpc: 'http://127.0.0.1:7546',
  }
};

export const defaultNetwork = Object.values(network).find(net => net.default);

export const i18n = [{
    langDisplay: '中文',
    locale: 'zh',
    aliases: ['zh', 'zh-cn', 'zh-hk', 'zh-sg', 'zh-tw'],
  },
  {
    langDisplay: 'English',
    locale: 'en',
    aliases: ['en', 'en-us', 'en-au', 'en-bz', 'en-ca', 'en-ie', 'en-jm', 'en-nz', 'en-ph', 'en-za', 'en-tt', 'en-gb', 'en-zw'],
  },
  {
    langDisplay: '日本語',
    locale: 'jp',
    aliases: ['jp'],
  },
];

export const items = itemsData;

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
    default: true, // It will be used when no metaMask
    name: 'Ropsten Test Network',
    contract: '0xc6cbcdd798e55781f5f8f33b55d9d0f10e26b85b',
    LuckyPackage: '0x6d641bdf80d793cc1a529998765c30cbf1463c06',
    DecentralizedExchangeHotPotato:'0xa123a22a157c23d05f4dc7e788dd96976da42145',
    rpc: 'https://ropsten.infura.io/lTETGFVyQX99UKQ98BN4',
  },
  4: {
    name: 'Rinkeby Test Network',
    contract: '',
    rpc: 'https://rinkeby.infura.io/lTETGFVyQX99UKQ98BN4',
  },
  42: {
    name: 'Kovan Test Network',
    contract: '',
    rpc: 'https://kovan.infura.io/lTETGFVyQX99UKQ98BN4',
  },
};

export const defaultNetwork = Object.values(network).find(net => net.default);

export const i18n = [
  {
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

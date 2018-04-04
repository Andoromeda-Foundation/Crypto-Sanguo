import FAQ_CONTENT from './faq.html';
import PRIVACY_CONTENT from './privacy.html';
import TERMS_CONTENT from './terms.html';

export default {
  header: {
    nav: {
      siteName: 'CryptoSanguo',
      explore: 'explore',
      game: 'Current Political Situation',
      myPage: 'Power',
      Transactions: 'Current Event',
      herolist: 'Encyclopedia',
    },
  },
  itemView: {
    tabs: {
      bio: 'Hero Introduce',
      attributes: 'Hero Property',
      transactions: 'Transaction Record',
    },
    tokenNotExist: 'The heroes have not yet appeared!',
    drawCards: 'Draw Cards',
    remainCards: 'Left cards: ',
    remainCardsNum: 'cards in the bag',
  },
  itemContent:{
    help: 'help:',
    content1: 'Crypto Sanguo innovates to launch a new blockchain game of drawing cards.',
    content2: 'To get a hero card by drawing a card will be the only official card release channel.',
    content3: 'The current cards and ratio of winning in the smart cardBag are full open and transparent.',
  },
  PackView: {
    tabs: {
      item: {
        title: 'Sanguo Token',
        pack: 'Token Package',
        all: 'Token Market',
        my: 'My Cards',
        title1: 'Card Broadcast',
        all1: 'All Broadcast',
        my1: 'My Broadcast',
        id: 'Number',
        owner: 'Owner',
        price: 'Price',
        action: '',
        buy: 'buy',
        rollDice: 'Use the luckyToken to draw cards!',
      },
      tx: {
        txHash: 'TX',
        date: 'date',
        from: 'user',
        status: 'status',
      },
      luckyToken: {
        title: 'LuckyToken',
        all: 'The LuckyToken Market',
        my: 'My LuckyToken',
        id: 'Number',
        owner: 'Owner',
        price: 'Price',
        action: 'Action',
        free1: 'The Start Time',
        free2: 'The End Time',
        buy: 'buy',
        watch: 'watch',
        rollDice: 'Use the luckyToken to draw cards!',
      },
    },
  },
  'My Cards': 'My Cards',
  'Sign In': 'Sign In',
  Home: 'Home',
  FAQs: 'FAQs',
  Owner: 'Owner',
  'Current Price': 'Current Price',
  Buy: 'Buy',
  BirthdayGift: 'BirthdayGift(HOT)',
  'Terms of Service': 'Terms of Service',
  'Privacy Policy': 'Privacy Policy',
  'Contact Us': 'Contact Us',
  Slogan: 'Slogan',
  EDIT_SLOGAN_TIP: 'After buying the card,you can edit the slogan!',
  'Edit Slogan': 'Edit Slogan',
  BUY_SUCCESS_MSG: 'Payment is successful. Please wait for the miner to confirm and refresh it later.',
  BUY_FAIL_MSG: 'Failed, refresh the page and try again.',
  UPDATE_SLOGAN_PROMPT: 'Please enter your slogan content (maximum 100 characters):',
  UPDATE_SLOGAN_FAIL_TOO_LOOG_MSG: 'The slogan can only be up to 100 characters long',
  UPDATE_SLOGAN_FAIL_MSG: 'Failed, refresh the page and try again.',
  User: 'User',
  'His Cards': 'His Cards',
  BUY_BTN: 'BUY_BTN',
  PREMIUM_BUY_BTN: 'PREMIUM_BUY_BTN{rate}',
  BUY_PRICE_TIP: 'The higher the bid, the greater the chance of capture! Recommend the use of 100+gas to increase the speed of transaction confirmation!',
  FAQ_CONTENT,
  PRIVACY_CONTENT,
  TERMS_CONTENT,
};

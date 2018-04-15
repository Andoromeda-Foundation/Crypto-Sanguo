import FAQ_CONTENT from './faq.html';
import PRIVACY_CONTENT from './privacy.html';
import TERMS_CONTENT from './terms.html';

export default {
  header: {
    nav: {
      siteName: '以太三国',
      explore: '探索',
      game: '时局',
      myPage: '势力',
      Transactions: '时事',
      herolist: '百科',
    },
  },
  itemView: {
    tabs: {
      bio: '武将介绍',
      attributes: '武将属性',
      transactions: '交易记录',
    },
    tokenNotExist: '武将尚未出场',
    drawCards: '立即抽卡',
    remainCards: '卡包剩余：',
    remainCardsNum: '张卡牌',
  },
  itemContent: {
    help: '帮助:',
    content1: '以太三国创新推出全新的区块链抽卡玩法。',
    content2: '通过抽卡方法获得武将卡，将会是唯一的官方卡牌发售渠道。',
    content3: '智能卡包中当前包含的卡牌和中奖概率完全公开透明。',
  },
  PackView: {
    tabs: {
      item: {
        title: '三国卡牌',
        pack: '卡包卡牌',
        all: '卡牌市场',
        my: '我的卡牌',
        title1: '抽卡广播',
        all1: '所有广播',
        my1: '我的广播',
        id: '编号',
        owner: '拥有者',
        price: '价格',
        action: '',
        buy: '购买',
        rollDice: '使用这个幸运币来抽卡',
      },
      tx: {
        txHash: 'TX',
        date: '日期',
        from: '用户',
        status: '抽中卡牌',
      },
      luckyToken: {
        title: '幸运币',
        all: '幸运币市场',
        my: '我的幸运币',
        id: '编号',
        owner: '拥有者',
        price: '价格',
        action: '操作',
        free1: '开始时间',
        free2: '截止时间',
        buy: '购买',
        watch: '查看',
        rollDiceTitle: '使用这个幸运币来抽卡',
        rollDice: '抽卡',
        createAuctionTitle: '售卖这个幸运币',
        approved: '委托这个幸运币给交易所售卖',
        createAuction: '售卖',
        revokeAuction: '取回',
        sendTitle: '赠送幸运币',
        send: '赠送',
      },

    },
  },
  'My Cards': '我的卡牌',
  'Sign In': '登录游戏',
  Home: '首页',
  FAQs: '常见问题',
  Owner: '拥有者',
  'Current Price': '当前价格',
  odds:'中奖概率',
  Buy: '购买',
  BirthdayGift: '智取生辰纲(HOT)',
  'Terms of Service': '使用条款',
  'Privacy Policy': '隐私政策',
  'Contact Us': '联系我们',
  Slogan: '标语',
  EDIT_SLOGAN_TIP: '购买此卡后，您可以编辑标语。',
  'Edit Slogan': '编辑标语',
  BUY_SUCCESS_MSG: '支付成功，请等待矿工确认，稍后再来刷新看看吧。',
  BUY_FAIL_MSG: '失败了，刷新网页再试试.',
  UPDATE_SLOGAN_PROMPT: '请输入您的标语内容(最长100个字符)：',
  UPDATE_SLOGAN_FAIL_TOO_LOOG_MSG: '标语最长只能100个字符',
  UPDATE_SLOGAN_FAIL_MSG: '失败了，刷新网页再试试.',
  User: '用户',
  'His Cards': 'TA的卡牌',
  BUY_BTN: '正价买入',
  PREMIUM_BUY_BTN: '溢价{rate}买入',
  BUY_PRICE_TIP: '出价越高，抢到的几率越大! 推荐使用100+gas，提高交易确认速度！',
  FAQ_CONTENT,
  PRIVACY_CONTENT,
  TERMS_CONTENT,
  alert: {
    rollDice: {
      success: {
        title: '抽卡',
        msg: '抽卡成功',
        confirmText: '确认',
      },
      fail: {
        title: '抽卡',
        msg: '取消抽卡',
        confirmText: '确认',
      },
      noLuckyToken: {
        title: '抽卡',
        msg: '不好意思，你目前没有幸运币，请去幸运币市场购买',
        confirmText: '确认',
      }
    },
    CreateAuction: {
      success: {
        title: '售出幸运币',
        msg: '售出幸运币成功',
        confirmText: '确认',
      },
      fail: {
        title: '售出幸运币',
        msg: '取消售出幸运币',
        confirmText: '确认',
      }
    },
    revokeAuction: {
      success: {
        title: '取回幸运币',
        msg: '取出幸运币成功',
        confirmText: '确认',
      },
      fail: {
        title: '取回幸运币',
        msg: '取消取回幸运币',
        confirmText: '确认',
      }
    },
    buyLuckyToken: {
      success: {
        title: '购买幸运币',
        msg: '购买幸运币成功',
        confirmText: '确认',
      },
      fail: {
        title: '购买幸运币',
        msg: '取消购买幸运币',
        confirmText: '确认',
      }
    },    
    sendLuckyToken: {
      success: {
        title: '赠送幸运币',
        msg: '赠送幸运币成功',
        confirmText: '确认',
      },
      fail: {
        title: '赠送幸运币',
        msg: '取消赠送幸运币',
        confirmText: '确认',
      }
    }

  }
};

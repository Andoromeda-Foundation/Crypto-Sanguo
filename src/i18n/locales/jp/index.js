import FAQ_CONTENT from './faq.html';
import PRIVACY_CONTENT from './privacy.html';
import TERMS_CONTENT from './terms.html';

export default {
  header: {
    nav: {
      siteName: 'イーサ三国志',
      preSale: '前売り',
      explore: '発見',
      game: 'ゲーム',
      myPage: '勢力',
      Transactions: 'イベント',
      herolist: '百科事典',
      SignIn: '登録'
    }
  },
  itemView: {
    tabs: {
      bio: '武将紹介',
      attributes: '武将属性',
      transactions: '取引履歴'
    },
    tokenNotExist: '武将未登場',
    drawCards: '今すぐ引く',
    remainCards: 'カードパッケージ残り：',
    remainCardsNum: '枚カード'
  },
  itemContent: {
    help: 'ガイド:',
    content1: '新しいブロックチェーンカードゲームはイーサ三国志に展開。',
    content2: 'カードを引くことで武将カードを入手するのは、公式カードリリースチャンネルで唯一的な方法。',
    content3: '智能カードパッケージに含まれているカードと当たる確率は全て公開。'
  },
  PackView: {
    tabs: {
      item: {
        title: '三国志カード',
        pack: 'パッケージカード',
        all: 'カード市場',
        my: '私のカード',
        title1: 'カード引き放送',
        all1: 'すべての放送',
        my1: '私の放送',
        id: '番号',
        owner: '所有者',
        price: '価格',
        action: '',
        buy: '購入',
        rollDice: 'このラッキーコインを使ってカードを引く'
      },
      tx: {
        txHash: 'TX',
        date: '日付',
        from: 'ユーザー',
        status: '当たるカード'
      },
      luckyToken: {
        title: 'ラッキーコイン',
        all: 'ラッキーコイン市場',
        my: '私のラッキーコイン',
        id: '番号',
        owner: '所有者',
        price: '価格',
        action: '指示',
        free1: '開始時間',
        free2: 'エンディング',
        buy: '購入',
        watch: '一覧',
        rollDiceTitle: 'このラッキーコインを使ってカードを引く',
        rollDice: 'カードを引く',
        createAuctionTitle: 'このラッキーコインを売る',
        approved: '取引所を委託してラッキーコインを売る',
        createAuction: '売る',
        revokeAuction: '取り戻す',
        sendTitle: '幸運なお金を与える',
        send: 'ギフト'
      }
    }
  },
  'My Cards': '私のカード',
  'Sign In': '登録',
  Home: 'ホームページ',
  FAQs: 'よくある質問',
  Owner: '所有者',
  'Current Price': '価格',
  odds: '当たる確率',
  Buy: '購入',
  BirthdayGift: '智取生辰綱(HOT)',
  'Terms of Service': '利用規約',
  'Privacy Policy': 'プライバシーポリシー',
  'Contact Us': 'お問い合わせ',
  Slogan: 'スローガン',
  EDIT_SLOGAN_TIP: 'スローガンを編集するには、先にカードを購入。',
  'Edit Slogan': 'スローガン編集',
  BUY_SUCCESS_MSG: '支払い成功しました、鉱夫の確認を待つ、後で見ましょう。',
  BUY_FAIL_MSG: '失敗しました、もう一度試しましょう。',
  UPDATE_SLOGAN_PROMPT: 'スローガン内容を入力してください(最長100文字)：',
  UPDATE_SLOGAN_FAIL_TOO_LOOG_MSG: 'ローガン最長は100文字のみ。',
  UPDATE_SLOGAN_FAIL_MSG: '失敗しました、もう一度試しましょう。',
  User: 'ユーザー',
  'His Cards': '彼/彼女のカード',
  BUY_BTN: '今の価格で購入',
  PREMIUM_BUY_BTN: '今の価格より{rate}で購入',
  BUY_PRICE_TIP: 'より高い入札、当たる確率は大きくなる! 100+のgasはオススメ、トランザクションの速度を高める！',
  FAQ_CONTENT,
  PRIVACY_CONTENT,
  TERMS_CONTENT,
  alert: {
    rollDice: {
      success: {
        title: 'カードを引く',
        msg: '成功しました',
        confirmText: '確認'
      },
      fail: {
        title: 'カードを引く',
        msg: '失敗しました',
        confirmText: '確認'
      },
      noLuckyToken: {
        title: 'カードを引く',
        msg: 'すみません、ラッキーコイン在庫ないので、ラッキーコイン市場で購入してください。',
        confirmText: '確認'
      }
    },
    CreateAuction: {
      success: {
        title: 'ラッキーコインを売る',
        msg: '成功しました',
        confirmText: '確認'
      },
      fail: {
        title: 'ラッキーコインを売る',
        msg: '失敗しました',
        confirmText: '確認'
      }
    },
    revokeAuction: {
      success: {
        title: 'ラッキーコインを取り戻す',
        msg: '成功しました',
        confirmText: '確認'
      },
      fail: {
        title: 'ラッキーコインを取り戻す',
        msg: '失敗しました',
        confirmText: '確認'
      }
    },
    buyLuckyToken: {
      success: {
        title: 'ラッキーコインを購入',
        msg: '成功しました',
        confirmText: '確認'
      },
      fail: {
        title: 'ラッキーコインを購入',
        msg: '失敗しました',
        confirmText: '確認'
      }
    },
    sendLuckyToken: {
      success: {
        title: '幸運なコインを送る',
        msg: 'ラッキーコインの成功を送る',
        confirmText: '確認'
      },
      fail: {
        title: '幸運なコインを送る',
        msg: '幸運なコインを送ることができなかった',
        confirmText: '確認'
      }
    }
  }
};

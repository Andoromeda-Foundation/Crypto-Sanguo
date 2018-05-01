<template lang="pug">
.container
  .item-view
      .notification.is-warning(v-if="item.owner === '0x0000000000000000000000000000000000000000'")
        h1|Sorry, but...
        p|This Lucky Token {{itemId}} doesn't exist
      .item(v-else-if="item")
        .columns.is-multiline.is-mobile
          .column.is-full-mobile
                img.item-image(:src="coinPhoto" style="float: right;")
          .column.is-full-mobile
            h1.title|幸运币第 {{itemId}} 号
            template
              figure.image.is-128x128
                img.item-image(:src="getIdeticon")
              ul
                li|{{$t('Owner')}}：
                  router-link(:to="toOwnerPage")
                    |{{item.owner.slice(-6).toUpperCase()}}

            // LuckyPackage Owner can do these
            .buttons(v-if="item.owner === me.address")
                button.button.is-danger(@click="onTrasfer(itemId)") 赠送
                button.button.is-danger(@click="onRollDice(itemId)") 抽取武将卡
                button.button.is-danger(@click="onCreateAuction(itemId)") 挂单
            .buttons(v-else)
              router-link(to="/presale")
                button.button.is-primary| Back
        .tx
            h1.title| 抽卡记录
            b-table(:data="txList" :columns="txColumns" striped)
</template>


<script>
import {
  buyLuckyToken,
  rollDice,
  revokeAuction,
  getLuckyToken,
  transfer
} from '@/api';
// import { toReadablePrice } from '@/util';
import getAvatarFromAddress from 'dravatar';
import getDrawHistoryTx from '@/api/lucky';

export default {
  name: 'lucky-token-view',
  components: {},
  data() {
    return {
      item: {},
      // txColumns: ,
      txList: []
    };
  },
  asyncComputed: {
    async getIdeticon() {
      const uri = await getAvatarFromAddress(this.item.owner);
      return uri;
    }
  },
  computed: {
    txColumns() {
      const $t = this.$t;
      return [
        {
          field: 'txHash',
          label: $t('PackView.tabs.tx.txHash')
        },
        {
          field: 'from',
          label: $t('PackView.tabs.tx.from')
        },
        {
          field: 'date',
          label: $t('PackView.tabs.tx.date')
        },
        {
          field: 'prize.title',
          label: $t('PackView.tabs.tx.status')
        }
      ];
    },
    toOwnerPage() {
      return { name: 'User', params: { address: this.item.owner } };
    },
    itemId() {
      return this.$route.params.id;
    },
    me() {
      return this.$store.state.me || {};
    },
    coinPhoto() {
      return 'https://ws2.sinaimg.cn/large/006tNc79gy1fqg3lasdupj309q09q3z8.jpg';
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize.bind(this));
  },
  async created() {
    this.item = await getLuckyToken(this.$route.params.id);
    this.txList = await getDrawHistoryTx(this.$route.params.id);
    // this.getLuckyTokenTx();
    // this.$set(item,)
  },

  watch: {},

  methods: {
    jump(props) {
      return {
        name: 'User',
        params: { address: props.row.from }
      };
    },
    jumpItem(props) {
      return {
        name: 'Item',
        params: { id: props.row.prize.id }
      };
    },
    checkLogin() {
      if (this.me && this.me.address) {
        return true;
      }
      alert(this.signInError);
      return false;
    },
    async onBuyLuckyToken(luckyToken) {
      if (!this.checkLogin()) {
        return;
      }
      let alertCfg;

      try {
        const txHash = await buyLuckyToken(luckyToken.id, luckyToken.price);
        // https://ropsten.etherscan.io/tx/0x785a82523626de92240c34ff9c55a838d4f252520e672d228bb8aa0a8f71a06e
        alertCfg = {
          type: 'is-dark',
          title: this.$t('alert.buyLuckyToken.success.title'),
          message: this.$t('alert.buyLuckyToken.success.msg', { txHash }),
          confirmText: this.$t('alert.buyLuckyToken.success.confirmText')
        };
      } catch (e) {
        console.error(e);
        alertCfg = {
          type: 'is-dark',
          title: this.$t('alert.buyLuckyToken.fail.title'),
          message: this.$t('alert.buyLuckyToken.fail.msg', { e }),
          confirmText: this.$t('alert.buyLuckyToken.fail.confirmText')
        };
      }
      this.$dialog.alert(alertCfg);
    },
    async onRollDice() {
      const tokenId = this.itemId;
      let alertCfg;
      try {
        const txHash = await rollDice(tokenId);
        alertCfg = {
          type: 'is-dark',
          title: this.$t('alert.rollDice.success.title'),
          message: this.$t('alert.rollDice.success.msg', { txHash }),
          confirmText: this.$t('alert.rollDice.success.confirmText')
        };
      } catch (e) {
        alertCfg = {
          type: 'is-dark',
          title: this.$t('alert.rollDice.fail.title'),
          message: this.$t('alert.rollDice.fail.msg', { e }),
          confirmText: this.$t('alert.rollDice.fail.confirmText')
        };
      }
      this.$dialog.alert(alertCfg);
    },
    async toTrasfer({ to, tokenId }) {
      let alertCfg;
      try {
        const txHash = await transfer({
          to,
          tokenId
        });
        // https://ropsten.etherscan.io/tx/0x785a82523626de92240c34ff9c55a838d4f252520e672d228bb8aa0a8f71a06e
        alertCfg = {
          type: 'is-dark',
          title: this.$t('alert.sendLuckyToken.success.title'),
          message: this.$t('alert.sendLuckyToken.success.msg', { txHash }),
          confirmText: this.$t('alert.sendLuckyToken.success.confirmText')
        };
      } catch (e) {
        alertCfg = {
          type: 'is-dark',
          title: this.$t('alert.sendLuckyToken.fail.title'),
          message: this.$t('alert.sendLuckyToken.fail.msg', { e }),
          confirmText: this.$t('alert.sendLuckyToken.fail.confirmText')
        };
      }
      this.$dialog.alert(alertCfg);
    },
    async onRevokeAuction(id) {
      let alertCfg;
      try {
        const txHash = await revokeAuction(id);
        alertCfg = {
          type: 'is-dark',
          title: this.$t('alert.revokeAuction.success.title'),
          message: this.$t('alert.revokeAuction.success.msg', { txHash }),
          confirmText: this.$t('alert.revokeAuction.success.confirmText')
        };
      } catch (e) {
        alertCfg = {
          type: 'is-dark',
          title: this.$t('alert.revokeAuction.fail.title'),
          message: this.$t('alert.revokeAuction.fail.msg', { e }),
          confirmText: this.$t('alert.revokeAuction.fail.confirmText')
        };
      }
      this.$dialog.alert(alertCfg);
    },
    async onTrasfer(tokenId) {
      this.$dialog.prompt({
        message: '送给谁(address)',
        inputAttrs: {},
        onConfirm: (to) => {
          this.toTrasfer({
            to,
            tokenId
          });
        }
      });
    },
    onSwitchTxType(type) {
      this.txTableType = type;
    },
    onSwitchLuckyTokenType(type) {
      this.luckyTokenTableType = type;
    },
    onSwitchItemType(type) {
      this.itemTableType = type;
    }
  }
};
</script>
 <style scoped>
.item-chartWrapper {
  width: 100%;
}
.item-chart {
  width: 100%;
  height: 100%;
  transform-origin: top left;
}
.item-image {
  max-width: 30rem;
  /* width: 100%; */
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.notification h1 {
  color: #4a4a4a;
  font-size: 3rem !important;
  font-weight: 600 !important;
  line-height: 1.5 !important;
}
</style>

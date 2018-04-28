<template>
  <div class="item-view">
    <div v-if="item.owner === '0x0000000000000000000000000000000000000000'">
      <div class="notification is-warning">
        <h1>Sorry, but...</h1>
        This Lucky Token {{itemId}} doesn't exist
      </div>

    </div>
    <div v-else-if="item">
      <div class="columns is-multiline is-mobile">
        <div class="column
           is-full-mobile">
              <img class="item-image"
                   :src="coinPhoto" />
        </div>
        <div class="column
           is-full-mobile">
          <h1 class="title">幸运币第 {{itemId}} 号</h1>
          <template >
            <figure class="image is-128x128">
              <img class="item-image"
              :src="getIdeticon">
            </figure>
            <ul>
              <li>{{$t('Owner')}}：
                <router-link :to="{ name: 'User', params:{address: item.owner}}">
                  {{item.owner.slice(-6).toUpperCase()}}
                </router-link>
              </li>
              <!-- <li>{{$t('Current Price')}}：{{toDisplayedPrice(item.price)}}</li> -->
            </ul>
            <br/>

            <!-- LuckyPackage Owner can do these -->

            <template v-if="item.owner === me.address">
              <div class="buttons">
                <button class="button is-danger" @click="onTrasfer(itemId)"> 赠送 </button>
                <button class="button is-danger" @click="onRollDice(itemId)"> 抽取武将卡 </button>
                <button class="button is-danger" @click="onCreateAuction(itemId)"> 挂单 </button>
              </div>
              <!-- <div class="buttons">
                <button class="button is-danger is-outlined"
                          @click="onCreateAuction(1)">{{ $t('BUY_BTN') }}
                          </button>
                  <button class="button is-danger is-outlined"
                          @click="onCreateAuction(1.1)">
                          {{ $t('PREMIUM_BUY_BTN', { rate: '10%' }) }}
                          </button>
                  <button class="button is-danger is-outlined"
                          @click="onCreateAuction(1.3)">
                          {{ $t('PREMIUM_BUY_BTN', { rate: '30%' }) }}
                          </button>
                  <button class="button is-danger is-outlined"
                          @click="onCreateAuction(1.5)">
                          {{ $t('PREMIUM_BUY_BTN', { rate: '50%' }) }}</button>
                  <button class="button is-danger is-outlined"
                          @click="onCreateAuction(2)">
                          {{ $t('PREMIUM_BUY_BTN', { rate: '100%' }) }}</button>
              </div> -->
            </template>
          </template>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import {
  getLuckTokensOf,
  buyLuckyToken,
  rollDice,
  createAuction,
  revokeAuction,
  getLuckyToken,
  approveD,
  transfer
} from '@/api';
// import { toReadablePrice } from '@/util';
import web3 from '@/web3';
import getAvatarFromAddress from 'dravatar';

export default {
  name: 'item-view',
  components: {
    // TransactionList
  },
  data() {
    return {
      item: {}
    };
  },
  asyncComputed: {
    async getIdeticon() {
      const uri = await getAvatarFromAddress(this.item.owner);
      return uri;
    }
  },
  computed: {
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
    // this.$nextTick(() => {
    //   console.log(this.$refs.itemChartWrapper);
    //   this.handleResize();
    // });
  },
  async created() {
    this.item = await getLuckyToken(this.$route.params.id);
    // this.$set(item,)
  },

  watch: {},

  methods: {
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
    async onRollDice(luckyTokenId) {
      if (!this.checkLogin()) {
        return;
      }
      let tokenId;
      // 没有指定使用哪个幸运币
      if (isNaN(luckyTokenId)) {
        const myLuckyTokenIds = await getLuckTokensOf(this.me.address);
        // 没有幸运币
        if (myLuckyTokenIds.length === 0) {
          this.$dialog.alert({
            type: 'is-dark',
            title: this.$t('alert.rollDice.noLuckyToken.title'),
            message: this.$t('alert.rollDice.noLuckyToken.msg'),
            confirmText: this.$t('alert.rollDice.noLuckyToken.confirmText')
          });
          return;
        }
        // 随机选一个幸运币
        const randomLuckyToken =
          myLuckyTokenIds[Math.floor(Math.random() * myLuckyTokenIds.length)];
        tokenId = randomLuckyToken.id;
      }

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
    async toCreateAuction({ tokenId, priceInETH, startTime, endTime }) {
      let alertCfg;
      try {
        const txHash = await createAuction({
          price: web3.toWei(priceInETH, 'ether'),
          tokenId,
          startTime,
          endTime
        });
        // https://ropsten.etherscan.io/tx/0x785a82523626de92240c34ff9c55a838d4f252520e672d228bb8aa0a8f71a06e
        alertCfg = {
          type: 'is-dark',
          title: this.$t('alert.CreateAuction.success.title'),
          message: this.$t('alert.CreateAuction.success.msg', { txHash }),
          confirmText: this.$t('alert.CreateAuction.success.confirmText')
        };
      } catch (e) {
        alertCfg = {
          type: 'is-dark',
          title: this.$t('alert.CreateAuction.fail.title'),
          message: this.$t('alert.CreateAuction.fail.msg', { e }),
          confirmText: this.$t('alert.CreateAuction.fail.confirmText')
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
    async onAppprove(luckyTokenId) {
      await approveD(luckyTokenId);
    },
    async onCreateAuction(luckyTokenId) {
      this.$dialog.prompt({
        message: '售卖价格(ETH)',
        inputAttrs: {},
        onConfirm: (priceInETH) => {
          this.$dialog.prompt({
            message: '挂单时长(小时)',
            inputAttrs: {
              value: 1 // default 1 hour
            },
            onConfirm: (durationInHour) => {
              const time = new Date().getTime() / 1000;
              const startTime = parseInt(time, 10);
              // const endTime = startTime + 24 * 60 * 60; // 1 day
              const endTime = startTime + (Number(durationInHour) * 60 * 60);
              this.toCreateAuction({
                tokenId: luckyTokenId,
                priceInETH,
                startTime,
                endTime
              });
            }
          });
        }
      });
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

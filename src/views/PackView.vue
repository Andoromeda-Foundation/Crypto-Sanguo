<template>
  <div class="PackView is-marginless is-clipped">

    <section class="KJ-position-relative has-text-centered">
      <img src="@/assets/img/packBg.png" />
      <div class="KJ-position-absolute-horizontal-center"
           style="bottom:5%">
        <div class="remainingCards-msg mainTextColor
        KJ-position-relative">卡包剩余：{{packageSize}} 张卡牌</div>
        <div @click="onRollDice()"
             class="KJ-position-relative KJ-cursor-pointer">
          <img style="width:82%"
               src="@/assets/img/button_chouka.png" />
          <span class="drawCard-btn-text mainTextColor
           KJ-position-absolute-horizontal-center has-text-weight-bold">
            立即抽卡</span>
        </div>
      </div>
    </section>

    <section class="help-msg">
      <h3>帮助:</h3>
      <p>以太三国创新推出全新的区块链抽卡玩法。</p>
      <p>通过抽卡方法获得武将卡，将会是唯一的官方卡牌发售渠道。</p>
      <p>智能卡包中当前包含的卡牌和中奖概率完全公开透明。</p>
    </section>

    <section>
      <b-tabs position="is-centered"
              class="block PackView-tabs">
        <b-tab-item :label="$t('PackView.tabs.item.title')">
          <div class="buttons is-centered">
            <button @click="onSwitchItemType('PACK')"
                    :class="{
                      'is-sg-btn-primary': itemTableType === 'PACK',
                       'is-sg-btn-dark': itemTableType !== 'PACK',
                    }"
                    class='button is-medium has-text-weight-bold'>
              {{$t('PackView.tabs.item.pack')}}
            </button>
            <button @click="onSwitchItemType('ALL')"
                    :class="{
                      'is-sg-btn-primary': itemTableType === 'ALL',
                       'is-sg-btn-dark': itemTableType !== 'ALL',
                    }"
                    class='button is-medium has-text-weight-bold'>
              {{$t('PackView.tabs.item.all')}}
            </button>
            <button @click="onSwitchItemType('MY')"
                    :class="{
                      'is-sg-btn-primary': itemTableType === 'MY',
                       'is-sg-btn-dark': itemTableType !== 'MY',
                    }"
                    class='button is-medium has-text-weight-bold'>
              {{$t('PackView.tabs.item.my')}}
            </button>
          </div>
          <div class=" columns is-mobile is-multiline">
            <b-loading :is-full-page="false"
                       :active.sync="isLoadingItems"
                       :canCancel="false"></b-loading>
            <div v-for="item in items"
                 :key="item.id.toString()"
                 class="column is-half-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd">
              <ItemPreview :item="item" />
            </div>
          </div>
        </b-tab-item>

        <b-tab-item label="卡牌广播">
          <div class="buttons is-centered">
            <button @click="onSwitchTxType('ALL')"
                    :class="{
                      'is-sg-btn-primary': txTableType === 'ALL',
                       'is-sg-btn-dark': txTableType !== 'ALL',
                    }"
                    class='button is-medium has-text-weight-bold'>
              所有广播
            </button>
            <button @click="onSwitchTxType('MY')"
                    :class="{
                      'is-sg-btn-primary': txTableType === 'MY',
                       'is-sg-btn-dark': txTableType !== 'MY',
                    }"
                    class='button is-medium has-text-weight-bold'>
              我的广播
            </button>
          </div>

          <b-table class="txTable"
                   :data="txList"
                   default-sort="date"
                   default-sort-direction="desc"
                   :striped="true"
                   :mobile-cards="false">
            <template slot-scope="props">

              <b-table-column field="txHash"
                              :label="$t('PackView.tabs.tx.txHash')"
                              centered>
                <a :href="'https://etherscan.io/tx/'+props.row.txHash"
                   target="_blank">
                  {{ props.row.txHash.slice(-6).toUpperCase() }}
                </a>
              </b-table-column>

              <b-table-column field="date"
                              :label="$t('PackView.tabs.tx.date')"
                              sortable
                              centered>
                {{ (new Date(props.row.date)).toLocaleString() }}
              </b-table-column>

              <b-table-column field="from"
                              :label="$t('PackView.tabs.tx.from')"
                              centered>
                <router-link :to="{
                  name: 'User',
                  params:{address: props.row.from}}">
                  {{ props.row.from.slice(-6).toUpperCase() }}
                </router-link>
              </b-table-column>

              <b-table-column field="status"
                              :label="$t('PackView.tabs.tx.status')"
                              centered>
                {{ props.row.status }}
              </b-table-column>

            </template>
          </b-table>

        </b-tab-item>
        <b-tab-item :label="$t('PackView.tabs.luckyToken.title')">
          <div class="buttons is-centered">
            <button @click="onSwitchLuckyTokenType('ALL')"
                    :class="{
                      'is-sg-btn-primary': luckyTokenTableType === 'ALL',
                       'is-sg-btn-dark': luckyTokenTableType !== 'ALL',
                    }"
                    class='button is-medium has-text-weight-bold'>
              {{$t('PackView.tabs.luckyToken.all')}}
            </button>
            <button @click="onSwitchLuckyTokenType('MY')"
                    :class="{
                      'is-sg-btn-primary': luckyTokenTableType === 'MY',
                       'is-sg-btn-dark': luckyTokenTableType !== 'MY',
                    }"
                    class='button is-medium has-text-weight-bold'>
              {{$t('PackView.tabs.luckyToken.my')}}
            </button>
          </div>

          <b-table class="txTable"
                   :data="luckyTokens"
                   default-sort="id"
                   default-sort-direction="asc"
                   :striped="true"
                   :loading="isLoadingLuckyTokens"
                   :mobile-cards="false">
            <template slot-scope="props">

              <b-table-column field="id"
                              :label="$t('PackView.tabs.luckyToken.id')"
                              sortable
                              centered>
                {{ props.row.id }}
              </b-table-column>
              <b-table-column field="price"
                              :label="$t('PackView.tabs.luckyToken.owner')"
                              centered>
                <a :href="'https://ropsten.etherscan.io/address/' + props.row.owner">
                  {{ props.row.owner.substr(36,42) }}
                </a>
              </b-table-column>

              <b-table-column field="price"
                              :label="$t('PackView.tabs.luckyToken.price')"
                              centered
                              sortable>
                {{ props.row.priceInETH }} ETH
              </b-table-column>

              <b-table-column field="free1"
                              :label="$t('PackView.tabs.luckyToken.free1')"
                              centered
                              sortable>
                {{ (new Date(props.row.free1 * 1000)).toLocaleString()}}
              </b-table-column>

              <b-table-column field="free2"
                              :label="$t('PackView.tabs.luckyToken.free2')"
                              centered
                              sortable>
                {{ (new Date(props.row.free2 * 1000)).toLocaleString() }}
              </b-table-column>

              <b-table-column field="id"
                              :label="$t('PackView.tabs.luckyToken.action')"
                              centered>
                <template v-if="props.row.owner === me.address">
                  <a @click="onRollDice(props.row.id)">
                    {{$t('PackView.tabs.luckyToken.rollDice')}}
                  </a>
                </template>
                <template v-else>
                  <template v-if="(props.row.free1 < Date.parse(new Date())/1000 && Date.parse(new Date())/1000 < props.row.free2)">
                    <a @click="onBuyLuckyToken(props.row)">
                      {{$t('PackView.tabs.luckyToken.buy')}}
                    </a>
                  </template>
                  <template v-else>
                    {{$t('PackView.tabs.luckyToken.buy')}}
                  </template>

                </template>
              </b-table-column>
            </template>
          </b-table>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ItemPreview from "@/components/ItemPreview";
import {
  getPackTx,
  getItemsOf,
  getPackage,
  getLuckTokensOf,
  getAllLuckyTokens,
  buyLuckyToken,
  rollDice,
  getPackageSize,
  getItems
} from "@/api";
import BTableColumn from "buefy/src/components/table/TableColumn";

// const API_MAP = {
//   'getLuckyTokens': {
//     'MY': getLuckTokensOf,
//     'ALL':
//   }
// };

export default {
  name: "PackView",
  components: {
    BTableColumn,
    ItemPreview
  },
  data() {
    return {
      packageSize: "",
      luckyTokens: [],
      items: [],
      txTableType: "ALL",
      luckyTokenTableType: "",
      itemTableType: "",
      isLoadingLuckyTokens: true,
      isLoadingItems: true,
      txList: []
    };
  },
  computed: {
    ...mapState(["me", "signInError"])
  },
  async created() {
    this.luckyTokenTableType = "ALL";
    this.itemTableType = "PACK";
    this.packageSize = await getPackageSize();
    this.txList = await getPackTx();
  },
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
          type: "is-dark",
          title: this.$t("alert.buyLuckyToken.success.title"),
          message: this.$t("alert.buyLuckyToken.success.msg", { txHash }),
          confirmText: this.$t("alert.buyLuckyToken.success.confirmText")
        };
      } catch (e) {
        alertCfg = {
          type: "is-dark",
          title: this.$t("alert.buyLuckyToken.fail.title"),
          message: this.$t("alert.buyLuckyToken.fail.msg", { e }),
          confirmText: this.$t("alert.buyLuckyToken.fail.confirmText")
        };
      }

      //this.$dialog.alert(alertCfg);
    },
    async onRollDice(luckyTokenId) {
      if (!this.checkLogin()) {
        return;
      }
      // 没有指定使用哪个幸运币
      if (isNaN(luckyTokenId)) {
        const myLuckyTokenIds = await getLuckTokensOf(this.me.address);
        // 没有幸运币
        if (myLuckyTokenIds.length === 0) {
          this.$dialog.alert({
            type: "is-dark",
            title: this.$t("alert.rollDice.noLuckyToken.title"),
            message: this.$t("alert.rollDice.noLuckyToken.msg"),
            confirmText: this.$t("alert.rollDice.noLuckyToken.confirmText")
          });
          return;
        }
        // 随机选一个幸运币
        const randomLuckyToken =
          myLuckyTokenIds[Math.floor(Math.random() * myLuckyTokenIds.length)];
        luckyTokenId = randomLuckyToken.id;
      }

      let alertCfg;
      try {
        const txHash = await rollDice(luckyTokenId);
        // https://ropsten.etherscan.io/tx/0x785a82523626de92240c34ff9c55a838d4f252520e672d228bb8aa0a8f71a06e
        alertCfg = {
          type: "is-dark",
          title: this.$t("alert.rollDice.success.title"),
          message: this.$t("alert.rollDice.success.msg", { txHash }),
          confirmText: this.$t("alert.rollDice.success.confirmText")
        };
      } catch (e) {
        alertCfg = {
          type: "is-dark",
          title: this.$t("alert.rollDice.fail.title"),
          message: this.$t("alert.rollDice.fail.msg", { e }),
          confirmText: this.$t("alert.rollDice.fail.confirmText")
        };
      }
      this.$dialog.alert(alertCfg);
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
  },
  watch: {
    async luckyTokenTableType(toType, fromType) {
      this.isLoadingLuckyTokens = true;
      try {
        if (toType === "ALL") {
          this.luckyTokens = await getAllLuckyTokens();
        }
        if (toType === "MY") {
          this.checkLogin();
          this.luckyTokens = await getLuckTokensOf(this.me.address);
        }
      } catch (e) {}
      this.isLoadingLuckyTokens = false;
    },
    async itemTableType(toType, fromType) {
      this.isLoadingItems = true;
      this.items = [];
      try {
        if (toType === "PACK") {
          this.items = await getPackage();
        }
        if (toType === "ALL") {
          this.items = await getItems();
        }
        if (toType === "MY") {
          this.checkLogin();
          this.items = await getItemsOf(this.me.address);
        }
      } catch (e) {}
      this.isLoadingItems = false;
    }
  },
};

</script>
<style lang="postcss" scoped>
.PackView {
  --paddingY: 18vw;
  --fontSize: 1vw;

  background-image: url("../assets/img/packViewBg.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #000;
  padding: 3% var(--paddingY) 5% var(--paddingY);
  font-size: var(--fontSize);
  @media (max-width: 800px) {
    --scale: 1.4;
    padding: 3% calc(var(--paddingY) * (var(--scale) -1)) 5%
      calc(var(--paddingY) * (var(--scale) -1));
    font-size: calc(var(--fontSize)* var(--scale));
  }
}
.mainTextColor {
  color: #fbb800;
}
.remainingCards-msg {
  font-size: 1.5em;
  bottom: -1.7em;
}
.drawCard-btn-text {
  font-size: 2em;
  bottom: 33%;
}
.help-msg {
  font-size: 1.1em;
  color: #eed9b2;
  padding: 2em 1.4em;
}
</style>

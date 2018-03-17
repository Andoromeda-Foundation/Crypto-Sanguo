<template>
  <div class="PackView is-marginless is-clipped">

    <section class="KJ-position-relative has-text-centered">
      <img src="@/assets/img/packBg.png" />
      <div class="KJ-position-absolute-horizontal-center"
           style="bottom:5%">
        <div class="remainingCards-msg mainTextColor
        KJ-position-relative">卡包剩余：8张卡牌</div>
        <div @click="onRollDice"
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
      <p>帮助文字风飒风帮助文字风飒风帮助文字风飒风帮助文字风飒风</p>
      <p>帮助文字风飒风帮助文字风飒风帮助文字风飒风帮助文字风飒风</p>
    </section>

    <section>
      <b-tabs position="is-centered"
              class="block PackView-tabs">
        <b-tab-item label="所有卡牌">
          <div class="columns is-mobile is-multiline">
            <div v-for="itemId in [1,2,3,4,5]"
                 :key="itemId"
                 class="column is-half-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd">
              <ItemPreview :itemId="itemId" />
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
        <b-tab-item label="我的Token">
          我的LuckToken
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import ItemPreview from '@/components/ItemPreview';
import { getPackTx } from '@/api';

export default {
  name: 'PackView',
  components: {
    ItemPreview,
  },
  data() {
    return {
      txTableType: 'ALL',
      txList: [],
    };
  },
  async created() {
    this.txList = await getPackTx();
  },
  methods: {
    onRollDice() {
      const luckTokenId = 1; // TODO: random pick up a luckToken
      this.$dialog.alert({
        type: 'is-dark',
        title: this.$t('alert.noLuckToken.title'),
        message: this.$t('alert.noLuckToken.msg'),
        confirmText: this.$t('alert.noLuckToken.confirmText'),
      });
    },
    onSwitchTxType(type) {
      this.txTableType = type;
    },
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

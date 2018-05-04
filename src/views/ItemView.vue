<template>
  <div class="item-view container">
    <div v-if="item">
      <div class="columns is-multiline is-mobile">
        <div class="column
           is-full-mobile">
          <div class="box columns">
            <div class="column is-6">
              <img class="item-image"
                   :src="item.imageUrl" />
            </div>
            <div class="column is-6">
              <!-- <div ref="itemChartWrapper"
                   class="item-chartWrapper"> -->
                <ECharts class="item-chart"
                         ref="itemChart"
                         :options="radarEChartOptions"
                         :init-options="radarEChartInitOptions"
                         auto-resize />
              <!-- </div> -->
            </div>
          </div>
        </div>
        <div class="column
           is-full-mobile">
          <h1 class="title">{{item.title}}</h1>
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
              <li v-if="false">{{$t('Current Price')}}：{{toDisplayedPrice(item.price)}}</li>
            </ul>
            <br/>
            <div v-if="false">
            <template v-if="item.owner !== me.address">
              <div class="buttons">
                <p>
                  <button class="button is-danger is-outlined"
                          @click="onBuy(1)">{{ $t('BUY_BTN') }}</button>
                  <button class="button is-danger is-outlined"
                          @click="onBuy(1.1)">{{ $t('PREMIUM_BUY_BTN', { rate: '10%' }) }}</button>
                  <button class="button is-danger is-outlined"
                          @click="onBuy(1.3)">{{ $t('PREMIUM_BUY_BTN', { rate: '30%' }) }}</button>
                  <button class="button is-danger is-outlined"
                          @click="onBuy(1.5)">{{ $t('PREMIUM_BUY_BTN', { rate: '50%' }) }}</button>
                  <button class="button is-danger is-outlined"
                          @click="onBuy(2)">{{ $t('PREMIUM_BUY_BTN', { rate: '100%' }) }}</button>
                </p>

              </div>
              <article class="message is-danger">
                <div class="message-body">
                  {{$t('BUY_PRICE_TIP')}}
                </div>
              </article>
            </template>
            <template v-else>
              <button class="button is-warning"
                      @click="onUpdatePrice">{{$t('CHANGE_PRICE_BTN')}}</button>
            </template>
            </div>
          </template>
          <!-- <template v-else>
            <article class="message is-danger">
              <div class="message-body">
                {{$t('itemView.tokenNotExist')}}
              </div>
            </article>
          </template> -->
        </div>
      </div>

      <div class="tabs">
        <ul @click="onClickTab">
          <li v-for="tab in (tabs)"
              :key="tab"
              v-bind:class="{ 'is-active': activeTab === tab }">
            <a :data-key="tab">{{ $t('itemView.tabs.'+tab) }} </a>
          </li>
        </ul>
      </div>

      <div class="tabs-content">
        <div v-show="activeTab === 'bio'"
             class="message-body">
          <div v-html="item.bio"></div>
        </div>
        <div v-show="activeTab === 'attributes'"
             class="columns is-multiline is-mobile">
          <div v-for="(attr,index) in item.attributes"
               :key="index"
               class="column is-2">
            <div class="tags has-addons">
              <span class="tag is-dark">{{attr.name}}</span>
              <span class="tag is-info">{{attr.value}}</span>
            </div>
          </div>
        </div>
        <div v-show="activeTab === 'transactions' ">
          <TransactionList :ids='transactionIds' />
        </div>
      </div>
    </div>

    <div v-else-if="item === null">
      Item doesn't exist
    </div>
  </div>
</template>

<script>
import TransactionList from '@/components/TransactionList';
import 'echarts/lib/chart/radar';
import { buyItem, setPrice } from '@/api';
import { toReadablePrice } from '@/util';
import web3 from '@/web3';
// import { getAvatarFromAddress } from '@/avatarService';
import getAvatarFromAddress from 'dravatar';

export default {
  name: 'item-view',
  components: {
    TransactionList
  },
  data() {
    return {
      activeTab: 'bio',
      radarEChartInitOptions: {},
      transactionIds: [1, 2]
    };
  },
  asyncComputed: {
    async getIdeticon() {
      const uri = await getAvatarFromAddress(this.item.owner);
      return uri;
    }
  },
  computed: {
    tabs() {
      return ['bio', 'attributes'];// , 'transactions'];
    },
    itemId() {
      return this.$route.params.id;
    },
    me() {
      return this.$store.state.me || {};
    },
    getIdeticon() {
      return getAvatarFromAddress(this.item.owner);
    },
    item() {
      return this.$store.state.items[this.itemId];
    },
    radarEChartOptions() {
      const indicator = [
        { name: '统御', max: 100 },
        { name: '武力', max: 100 },
        { name: '政治', max: 100 },
        { name: '智力', max: 100 },
        { name: '魅力', max: 100 }
      ];
      const item = this.item || {};
      const value = indicator.map(
        ({ name }) => (item[name] === undefined ? 0 : item[name]),
      );
      return {
        radar: {
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator
        },
        series: [
          {
            type: 'radar',
            data: [{ value }]
          }
        ]
      };
    }
  },
  updated() {
    this.handleResize();
  },
  mounted() {
    window.addEventListener('resize', this.handleResize.bind(this));
    // this.$nextTick(() => {
    //   this.handleResize();
    // });
  },
  async created() {
    this.$store.dispatch('FETCH_ITEM', this.itemId);
  },

  watch: {},

  methods: {
    onClickTab(e) {
      const key = e.target.dataset.key;
      if (key) this.activeTab = key;
    },
    handleResize() {
      const ratio = 1;
      const wrapperWidth = this.$refs.itemChartWrapper.clientWidth;
      const width = Math.max(wrapperWidth, 340);
      const height = width * ratio;

      const chartStyle = this.$refs.itemChart.$el.style;
      chartStyle.height = `${height}px`;
      chartStyle.width = `${width}px`;

      const scale = Math.min(wrapperWidth / width, 1);
      chartStyle.transform = `scale(${scale},${scale})`;
    },
    onBuy(rate) {
      if (this.$store.state.signInError) {
        this.$router.push({ name: 'Login' });
        return;
      }
      const buyPrice = this.item.price.times(rate).toFixed(0);
      buyItem(this.itemId, buyPrice)
        .then((txHash) => {
          alert(`${this.$t('BUY_SUCCESS_MSG')}txHash: ${txHash}`);
        })
        .catch((e) => {
          alert(this.$t('BUY_FAIL_MSG'));
          console.error(e);
        });
    },
    toDisplayedPrice(priceInWei) {
      const readable = toReadablePrice(priceInWei);
      return `${readable.price} ${readable.unit}`;
    },
    async onUpdatePrice() {
      let priceInEth = prompt(this.$t('UPDATE_PRICE_PROMPT'));
      if (priceInEth === null) {
        return;
      }
      priceInEth = Number(priceInEth);
      if (isNaN(priceInEth) || priceInEth <= 0) {
        alert(this.$t('UPDATE_PRICE_ERROR_MSG'));
        return;
      }
      const priceInWei = web3.toWei(priceInEth, 'ether');
      // double confirm
      const msg = this.$t('UPDATE_PRICE_CONFRIM', { priceInWei, priceInEth });
      if (!confirm(msg)) {
        return;
      }

      setPrice(this.itemId, priceInWei)
        .then(() => {
          alert(this.$t('UPDATE_PRICE_SUCCESS_MSG'));
        })
        .catch(() => {
          alert(this.$t('UPDATE_PRICE_FAIL_MSG'));
        });
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
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
</style>

<template>
  <div class="container" style="background-image: url(./static/icons-background.svg)">

    <section class="session">
          <div class="columns usercontainer">
            <div class="column is-2-desktop is-3-tablet is-offset-1-desktop">
                  <p class="image is-128x128">
                    <img class="radiusimg" :src="getIdeticon">
                  </p>
            </div>
            <div class="column is-10-desktop is-9-tablet">
                  <h1 class="userinfo">
                    {{$t('Nickname')}}: {{nickame}}
                  </h1>
                  <h2 class="userinfo">
                    {{$t('Address')}}: {{address}}
                  </h2>
                  <h1 class="userinfo">
                    {{$t('Benefit')}}: {{benefit}}
                  </h1>
            </div>
          </div>

            <!-- <div class="navbar-tabs">
              <a class="navbar-item is-tab">
                <a v-if="me && me.address.toUpperCase() === address">{{$t('Cards I Bought')}}</a>
                <a v-else>{{$t('Cards He Bought')}}</a>
              </a>
              <a class="navbar-item is-tab">
                <a v-if="me && me.address.toUpperCase() === address">{{$t('Cards I Created')}}</a>
                <a v-else>{{$t('Cards He Created')}}</a>
              </a>
            </div> -->
    </section>

    <section class="session usercontainer">
      <h1>我拥有的卡牌：</h1>
      <br/>
      <div class="columns is-multiline is-mobile">
        <div class="column is-3-desktop is-3-tablet is-12-mobile playContainer" v-for="item in itemIds" :key="item.title">
          <img alt="" :src="item.imageUrl"/>
          <br>
          <a>英雄：{{ item.姓名 }}</a>
          <br>
          <a>当前价格：{{ item.price/1000000000000000000 }}</a>
          <br>
          <a>ETH价格：{{ item.priceInETH }}</a>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script>
import ItemList from '@/components/ItemList';
import { getItemsOf } from '@/api';
import getAvatarFromAddress from 'dravatar';

export default {
  name: 'UserView',
  components: {
    ItemList
  },
  data: () => ({
    itemIds: []
  }),
  asyncComputed: {
    async getIdeticon() {
      const uri = await getAvatarFromAddress(this.addr);
      return uri;
    }
  },
  computed: {
    address() {
      return this.$route.params.address.toUpperCase();
    },
    nickame() {
      return "";
    },
    benefit() {
      return "";
    },
    addr() {
      return this.$route.params.address;
    },
    me() {
      return this.$store.state.me;
    }
  },
  async created() {
    this.itemIds = await getItemsOf(this.$route.params.address);
  },

  watch: {},

  methods: {}
};
</script>
<style scoped>
.user-info-wrapper {
  border-radius: 5px;
}
.radiusimg {
  border-radius:5%;
}
.section {
  margin: 50px;
  padding: 50px;
}
.usercontainer {
  border: 1px solid gainsboro;
  border-radius: 5px;
  border-color: #d7d7d7;
  padding: 30px;
  margin-left: 50px; 
  margin-right: 50px;
  margin-top: 30px;
}
.userinfo {
  margin-top: 15px;
  margin-bottom: 15px;
}
.playContainer {
  text-align: center;
}
</style>


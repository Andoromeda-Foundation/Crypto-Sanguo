<template>
  <div class="container">
    <section class="session"
             style="background-image: url(./static/icons-background.svg)">
      <div class="hero-body">
        <div class="column is-8 is-offset-2">
            <div class="column is-multiline is-mobile">
              <div class="columns box">
                <div class="column is-3">
                  <p class="image is-128x128">
                    <img :src="getIdeticon">
                  </p>
                </div>
                <div class="column is-9">
                  <h1 class="">
                    {{$t('Nickname')}}: {{nickame}}
                  </h1>
                  <h2 class="">
                    {{$t('Address')}}: {{address}}
                  </h2>
                  <h1 class="">
                    {{$t('Benefit')}}: {{benefit}}
                  </h1>

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
                </div>
              </div>

            </div>


        </div>

      </div>

    </section>
    <ItemList :itemIds='itemIds' />
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
</style>


<template>
  <router-link v-if="item"
               :to="{ name: 'Item', params:{id: this.itemId}}">
    <div class="KJ-position-relative">
      <img class="KJ-width-100"
           src="@/assets/img/cardBorder.png" />
      <img class="card-img"
           :src="item.imageUrl" />
    </div>
    <div class="card-fooer columns is-mobile is-gapless has-text-centered has-text-weight-bold">
      <h5 class="column card-name is-4">{{item.title}}
      </h5>
      <div class="column card-info">
        <span v-if="item.ratio !== undefined">中奖概率:{{item.ratio}}</span>
        <span v-else>拥有者: {{ item.owner.slice(-6).toUpperCase() }}</span>
        <span>当前价格:{{item.price}} ETH</span>
      </div>
    </div>
  </router-link>
</template>

<script>

export default {
  name: 'item-preview',
  props: ['itemId', 'item'],

  data: () => ({
    // item: null,
  }),

  computed: {},

  methods: {},

  async created() {
    // this.item = await getItem(this.itemId);
  },

  watch: {},
};
</script>
 <style lang="postcss" scoped>
.card-img {
  position: absolute;
  width: 85.9%;
  left: 8.8%;
  top: 6.6%;
  height: 85%;
}
.card-fooer {
  padding: 2% 7%;
}
.card-name {
  background: #62546c;
  color: #fff;
  border: 3px solid #150e33;
  line-height: 2.7em;
  font-size: 1.6em;
}
.card-info {
  background: #80848d;
  color: #fff;
  border: 3px solid #150e33;
  border-left: none;
  & span {
    display: block;
    padding: 2.5%;
    font-size: 1em;
  }
}
</style>

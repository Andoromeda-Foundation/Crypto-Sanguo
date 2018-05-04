<template>
  <div class=""
       style="background-image: url(./static/icons-background.svg)">
    <div v-if="loading"
         class="loader-wrapper">
      <pulse-loader></pulse-loader>
    </div>
    <ItemList :itemIds='itemIds' />
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader';
import ItemList from '@/components/ItemList';
import { getTotal } from '@/api';

export default {
  name: 'item-list',
  components: {
    PulseLoader,
    ItemList
  },

  data() {
    return {
      loading: true,
      itemIds: [],
      total: null
    };
  },

  computed: {},

  async created() {
    this.total = await getTotal();
    const itemIds = Array.from(
      new Array(this.total.toNumber()),
      (val, index) => index,
    );
    this.itemIds = itemIds;
    this.loading = false;
  },

  methods: {},
  watch: {}
};
</script>
<style scoped>
.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>


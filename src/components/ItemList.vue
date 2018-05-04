<template>
  <div class="columns is-multiline is-mobile">
    <router-link v-for="item in items"
                 v-if="item"
                 :to="{ name: 'Item', params:{id: item.id}}"
                 :key=item.id.toString()
                 class="column
           is-full-mobile
           is-one-quarter-tablet
           is-one-quarter-desktop
           is-one-quarter-widescreen
           is-one-quarter-fullhd">
      <div class="card">
        <div class="card-content">
          <div class="content is-small">
            <ul>
              <li>{{$t('ID')}}: {{item.id}}</li>
              <li>{{$t('Owner')}}：
                <router-link v-if="item.owner"
                             :to="{ name: 'User', params:{address: item.owner}}">
                  {{item.owner.slice(-6).toUpperCase()}}
                </router-link>
              </li>
              <li>{{$t('Current Price')}}: {{toDisplayedPrice(item.price)}}</li>
            </ul>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { toReadablePrice } from '@/util';

export default {
  name: 'item-lists',
  props: ['itemIds'],

  data: () => ({}),

  computed: {
    items() {
      return this.itemIds.map((id) => {
        const item = this.$store.state.items[id];
        return item || { id };
      });
    }
  },

  methods: {
    toDisplayedPrice(priceInWei) {
      const readable = toReadablePrice(priceInWei);
      return `${readable.price} ${readable.unit}`;
    }
  },

  created() {},

  watch: {
    itemIds(newItemIds) {
      newItemIds.forEach((itemId) => {
        this.$store.dispatch('FETCH_ITEM', itemId);
      });
    }
  }
};
</script>
 <style scoped>

</style>


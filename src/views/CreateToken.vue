<template>
  <div class="createTokenView">

    <label class="label">发行价</label>
    <div class="field has-addons">
      <p class="control">
        <input class="input"
               type="number"
               v-model="price"
               placeholder="输入Token的发行价">

      </p>
      <p class="control">
        <a class="button is-static">
          ETH
        </a>
      </p>
    </div>

    <label class="label">冷却时间</label>
    <div class="field has-addons">
      <p class="control">
        <input class="input"
               type="number"
               v-model="freeTime"
               placeholder="">

      </p>
      <p class="control">
        <a class="button is-static">
          秒
        </a>
      </p>
    </div>
    <!--<p class="help">This username is available</p>-->

    <div class="field">
      <label class="label">父Token编号</label>
      <div class="control">
        <input class="input"
               type="number"
               v-model="parentId"
               placeholder="">
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link"
                @click="onSubmit">确认</button>
      </div>
      <div class="control">
        <button class="button is-text">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createToken } from '@/api';

export default {
  name: 'item-view',

  data: () => ({
    price: null,
    freeTime: null,
    parentId: null,
  }),

  computed: {},
  async created() {},

  watch: {},

  methods: {
    onSubmit() {
      createToken({
        price: this.price,
        freeTime: this.freeTime,
        parentId: this.parentId,
      })
        .then((result) => {
          alert('成功了，一会刷新');
          console.log(result);
        })
        .catch((e) => {
          alert('出错了.');
          console.log(e);
        });
    },
  },
};
</script>
 <style scoped>
.createTokenView{
  margin-top: 110px;
  margin: 10rem;

}
</style>

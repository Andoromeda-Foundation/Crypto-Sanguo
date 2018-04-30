<template>
  <div class="createTokenView"
       style="background-image: url(./static/icons-background.svg)">
    <div class="hero-body">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey has-text-centered">Create Token</h3>
        <p class="subtitle has-text-grey has-text-centered">You can create your own token now</p>
        <div class="container">
          <div class="box"
               style="width: 400px;">
            <div class="field is-horizen">
              <label class="label">发行价</label>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input class="input"
                         type="number"
                         v-model="price"
                         placeholder="输入Token的发行价">
                </p>
                <p class="control">
                  <a class="button is-static">
                    eth
                  </a>
                </p>
              </div>
              <label class="label">Frozen时间1</label>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input class="input"
                         type="number"
                         v-model="frozen1"
                         placeholder="请输入冻结的时间">
                </p>
                <p class="control">
                  <a class="button is-static">
                    s
                  </a>
                </p>
              </div>
              <label class="label">Frozen时间2</label>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input class="input "
                         type="number"
                         v-model="frozen1"
                         placeholder="请输入冻结的时间">
                </p>
                <p class="control">
                  <a class="button is-static">
                    s
                  </a>
                </p>
              </div>

              <!--<p class="help">This username is available</p>-->
              <label class="label">父Token ID</label>
              <div class="field ">
                <p class="control">
                  <input class="input"
                         type="number"
                         v-model="ftoken"
                         placeholder="请输入父token的编号">
                </p>
              </div>

              <label class="label">Token 名称</label>
              <div class="field ">
                <p class="control">
                  <input class="input"
                         type="text"
                         v-model="Tname"
                         placeholder="请输入Token的名称">
                </p>
              </div>

              <label class="label">Token 简介</label>
              <div class="field ">
                <textarea class="textarea"
                          placeholder="e.g. Hello world"></textarea>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link is-fullwidth"
                          @click="onSubmit">确认</button>
                </div>
                <div class="control">
                  <button class="button is-text">取消</button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    frozen1: null,
    frozen2: null,
    parentId: null
  }),

  computed: {},

  created() {},

  watch: {},

  methods: {
    onSubmit() {
      createToken({
        price: this.price,
        frozen1: this.frozen1,
        frozen2: this.frozen2,
        parentId: this.parentId
      })
        .then((txHash) => {
          alert(`成功了，一会刷新. txHash: ${txHash}`);
        })
        .catch((e) => {
          alert('出错了.');
          console.error(e); // If error happened
        });
    }
  }
};
</script>
 <style scoped>

</style>

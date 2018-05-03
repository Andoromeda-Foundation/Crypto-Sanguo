// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import lodash from 'lodash';
import VueLodash from 'vue-lodash';
import vueConfig from 'vue-config';
import VueLazyload from 'vue-lazyload';
import VueResource from 'vue-resource';
import Buefy from 'buefy';
import asyncComputed from 'vue-async-computed';

// https://github.com/ecomfe/vue-echarts/blob/master/demo/Demo.vue
import ECharts from 'vue-echarts/components/ECharts';
import * as config from '@/config';
import App from './App';
import store from './store';
import router from './router';
import i18n from './i18n';

Vue.config.productionTip = false;
Vue.use(VueLodash, lodash);
Vue.use(VueResource);
Vue.use(asyncComputed);
Vue.use(VueLazyload);
Vue.use(vueConfig, config);
Vue.use(Buefy);


Vue.component('ECharts', ECharts);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  router,
  components: { App },
  template: '<App/>'
});

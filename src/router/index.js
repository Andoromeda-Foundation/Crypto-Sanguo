import Vue from 'vue';
import Router from 'vue-router';
import IndexView from '@/views/IndexView';

Vue.use(Router);

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: IndexView,
    },
  ],
});

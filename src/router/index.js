import Vue from 'vue';
import Router from 'vue-router';
import IndexView from '@/views/IndexView';
import CreateToken from '@/views/CreateToken';
import ListView from '@/views/ListView';
import UserView from '@/views/UserView';
import ItemView from '@/views/ItemView';
import LoginView from '@/views/LoginView';

Vue.use(Router);

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: IndexView,
    },
    {
      name: 'CreateToken',
      path: '/token/create',
      component: CreateToken,
    },
    {
      name: 'ListView',
      path: '/token/list',
      component: ListView,
    },
    {
      name: 'User',
      path: '/user/:address',
      component: UserView,
    },
    {
      name: 'List',
      path: '/list',
      component: ListView,
    },
    {
      name: 'Login',
      path: '/Login',
      component: LoginView,
    },
    {
      name: 'Item',
      path: '/item/:id(\\d+)',
      component: ItemView,
    },

  ],
});

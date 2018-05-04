import Vue from 'vue';
import Router from 'vue-router';

import HomeView from '@/views/HomeView';
import PreSaleView from '@/views/PreSaleView';
import ExploreView from '@/views/ExploreView';
import ItemView from '@/views/ItemView';
import UserView from '@/views/UserView';
import GameView from '@/views/GameView';
import CreateItemView from '@/views/CreateItemView';
import LoginView from '@/views/LoginView';
import RecentView from '@/views/RecentView';
import TransactionView from '@/views/TransactionView';
import HeroListView from '@/views/HeroListView';
import BPView from '@/views/BPView';
import LuckyTokenView from '@/views/LuckyTokenView';

Vue.use(Router);

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: HomeView
    },
    {
      name: 'PreSale',
      path: '/presale',
      component: PreSaleView
    },
    {
      name: 'Explore',
      path: '/explore',
      component: ExploreView
    },
    {
      name: 'Item',
      path: '/item/:id(\\d+)',
      component: ItemView
    },
    {
      name: 'LuckyTokenView',
      path: '/lucky/:id(\\d+)',
      component: LuckyTokenView
    },
    {
      name: 'User',
      path: '/user/:address',
      component: UserView
    },
    {
      name: 'Game',
      path: '/game',
      component: GameView
    },
    {
      name: 'CreateItem',
      path: '/item/create',
      component: CreateItemView
    },
    {
      name: 'HeroList',
      path: '/herolist',
      component: HeroListView
    },
    {
      name: 'Login',
      path: '/Login',
      component: LoginView
    },
    {
      name: 'Recent',
      path: '/Recent',
      component: RecentView
    },
    {
      name: 'Transaction',
      path: '/transaction',
      component: TransactionView
    },
    {
      name: 'BP',
      path: '/bp',
      component: BPView
    }
  ]
});

import { createRouter, createWebHistory } from 'vue-router'

import Authentication from '@pages/authentication/index.vue';
import Wallet from '@pages/wallet/index.vue';
// const Authentication = (e) => import(/* webpackChunkName: 'Authentication' */ '@pages/authentication/index.vue');
// const Wallet = (e) => import(/* webpackChunkName: 'Wallet' */ '@pages/wallet/index.vu');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Authentication
    },
    {
      path: '/registration',
      name: 'registration',
      component: Authentication
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet
    },
  ]
})

router.beforeEach(async (to, from) => {

  if(to.href == '/') {
    return { name: 'login' }
  }
})

export default router

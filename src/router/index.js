import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/main/Index'
Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/main/Index'),

  },
  {
    path: '/evaluate',
    name: 'evaluate',
    component: () => import('../views/main/Evaluate'),
  },
  {
    path: '/merchant',
    name: 'merchant',
    component: () => import('../views/main/Merchant'),
  },
  // {
  //   path: '/shopdetail',
  //   name: 'shopdetail',
  //   component: () => import('../views/main/ShopDetail'),
  // },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

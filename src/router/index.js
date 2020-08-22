import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      // 首页
      {
        path: '/main/index',
        name: '/main/index',
        component: () => import('../views/main/Index'),
      },
      // 评价
      {
        path: '/main/evaluate',
        name: '/main/evaluate',
        component: () => import('../views/main/Evaluate'),
      },
      // 商家
      {
        path: '/main/merchant',
        name: '/main/merchant',
        component: () => import('../views/main/Merchant'),
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

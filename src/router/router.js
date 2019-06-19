import Vue from 'vue'
import Router from 'vue-router'

import userManage from './userManage'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '/',
      redirect: 'Index',
      component: () => import('@/Layout.vue'),
      children: [
        {
          path: '/index',
          name: 'Index',
          component: () => import('@/views/Home/Home.vue')
        },
        ...userManage
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Home/Login.vue')
    }
  ]
})

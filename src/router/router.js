/*
 * @Descripttion:router
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-07 15:10:00
 */
import Vue from 'vue'
import Router from 'vue-router'

import ServiceHall from './ServiceHall'
import ResourceCenter from './ResourceCenter'
import UserManage from './UserManage'
import StatisticalAnalysis from './StatisticalAnalysis'
import SystemSetting from './SystemSetting'
Vue.use(Router)
const syncRoute = [
  {
    path: '/',
    name: 'Index',
    redirect: '/Home',
    component: () => import('@/Layout.vue'),
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: () => import('@/views/Home/Home.vue')
      },
      ...ServiceHall,
      ...ResourceCenter,
      ...UserManage,
      ...StatisticalAnalysis,
      ...SystemSetting
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Home/Login.vue')
  }
]
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: syncRoute
})

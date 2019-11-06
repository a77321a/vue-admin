/*
 * @Descripttion:router
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-06 22:51:12
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
    redirect: 'Home',
    component: () => import('@/Layout.vue'),
    children: [
      {
        path: '/home',
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
  routes: syncRoute
})

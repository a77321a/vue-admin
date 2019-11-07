/*
 * @Descripttion:
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-07 18:46:52
 */
import Vue from 'vue'
import App from './App.vue'
// Vue-router
import router from './router/router'
// Vuex
import store from './store/store'
// elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 封装表格组件
import Table from './components/Table/Table.vue'
import UEditor from './components/UEditor/UEditor.vue'

import axios from './common/js/axios'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 配置NProgress进度条选项  —— 动画效果
window.docTitle = document.title
Vue.component('Table', Table)
Vue.component('UEditor', UEditor)

Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  store.commit('setPath', to.fullPath)
  if (to.meta.title) {
    document.title = window.docTitle + ' - ' + to.meta.title
  }
  if (to.name == null) {
    router.push({ name: 'Home' })
  }
  NProgress.start()
  next()
})
router.afterEach(transition => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

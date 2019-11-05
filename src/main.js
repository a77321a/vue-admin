/*
 * @Descripttion:
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-05 11:00:07
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
import axios from './common/js/axios'

Vue.component('Table', Table)
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

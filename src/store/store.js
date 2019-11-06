/*
 * @Descripttion:
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-06 10:49:17
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    navList: []
  },
  mutations: {
    setNavList (state, data) {
      // localStorage.setItem('navList', JSON.stringify(data))
      state.navList = data
    }
  },
  actions: {

  }
})

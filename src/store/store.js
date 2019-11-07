/*
 * @Descripttion:
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-07 18:02:08
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    fullPath: '',
    navList: sessionStorage.navList ? JSON.parse(sessionStorage.navList) : [],
    opens: sessionStorage.opens ? JSON.parse(sessionStorage.opens) : []
  },
  mutations: {
    setNavList (state, data) {
      sessionStorage.setItem('navList', JSON.stringify(data))
      state.navList = data
    },
    setPath (state, data) {
      state.fullPath = data
    },
    setOpenName (state, data) {
      state.opens.push(data)
      let arr = [...new Set(state.opens)]
      sessionStorage.setItem('opens', JSON.stringify(arr))
    }
  },
  actions: {
    // 获取用户信息
    get_menu (context, { id, router }) {

    }
  }
})

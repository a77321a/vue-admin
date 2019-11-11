/*
 * @Descripttion:
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-11 09:56:35
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {},
    token: localStorage.webToken || '', // token
    fullPath: '',
    navList: sessionStorage.navList ? JSON.parse(sessionStorage.navList) : [],
    opens: sessionStorage.opens ? JSON.parse(sessionStorage.opens) : [],
    dialogHeight: `${(document.documentElement.clientHeight) - 330}`
  },
  mutations: {
    setUserInfo (state, data) {
      state.userInfo = data
      localStorage.setItem('userInfo', JSON.stringify(data))
    },
    setToken (state, token) {
      state.token = token
      localStorage.setItem('webToken', token)
    },
    setNavList (state, data) {
      sessionStorage.setItem('navList', JSON.stringify(data))
      state.navList = data
    },
    setPath (state, data) {
      state.fullPath = data
    },
    delOpenName (state, data) {
      let arr = new Set(state.opens)
      if (arr.has(data)) {
        arr.delete(data)
      }
      let newArr = [...arr]
      sessionStorage.setItem('opens', JSON.stringify(newArr))
    },
    setOpenName (state, data) {
      let arr = new Set(state.opens)
      if (!arr.has(data)) {
        arr.add(data)
      }

      let newArr = [...arr]
      sessionStorage.setItem('opens', JSON.stringify(newArr))
    }
  },
  actions: {
    // 获取用户信息
    get_menu (context, { id, router }) {

    }
  }
})

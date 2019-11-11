/*
 * @Descripttion:
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-10 19:41:01
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.webToken || '', // token
    fullPath: '',
    navList: sessionStorage.navList ? JSON.parse(sessionStorage.navList) : [],
    opens: sessionStorage.opens ? JSON.parse(sessionStorage.opens) : [],
    dialogHeight: `${(document.documentElement.clientHeight) - 330}`
  },
  mutations: {
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
    setOpenName (state, data) {
      let arr = new Set(state.opens)
      if (arr.has(data)) {
        arr.delete(data)
      } else {
        arr.add(data)
      }
      console.log(arr)
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

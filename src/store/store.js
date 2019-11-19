/*
 * @Descripttion:
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-19 10:52:19
 */
import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/common/js/axios'
import config from '../config/config'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {},
    token: localStorage.webToken || '', // token
    fullPath: '',
    navList: sessionStorage.navList ? JSON.parse(sessionStorage.navList) : [],
    breadList: sessionStorage.breadList ? JSON.parse(sessionStorage.breadList) : [],
    opens: sessionStorage.opens ? JSON.parse(sessionStorage.opens) : [],
    dialogHeight: `${(document.documentElement.clientHeight) - 330}`,
    config: config
  },
  mutations: {
    setBreadList (state, breadList) {
      state.breadList = breadList
      sessionStorage.setItem('breadList', JSON.stringify(breadList))
    },
    addBread (state, breadList) {
      state.breadList.push(breadList)
      sessionStorage.setItem('breadList', JSON.stringify(state.breadList))
    },
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

    },
    getDictionaryManagement (context) {
      http.get('/dictionary/getDictByCatalogKey', {
        dictCatalogKey: 'ACTIVITY_STATUS'
      }).then((res) => {
        console.log(context.state.config)
        config.activityStatus = res.payload
        console.log(context.state.config)
      })
    }
  }
})

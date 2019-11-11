
import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from '@/router/router'
import store from '@/store/store'

// 全局定义loading
let loading
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0)'
  })
}
function endLoading () {
  loading.close()
}
// 防抖实现函数
// function debounce (action, idle) {
//   var last
//   return function () {
//     var ctx = this; var args = arguments
//     clearTimeout(last)
//     last = setTimeout(function () {
//       action.apply(ctx, args)
//     }, idle)
//   }
// }
// 一段时间内的请求共用一个loading
let needLoadingRequestCount = 0
export function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
export function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    // 是否一段时间内共用一个loading
    endLoading()
  }
}
// 合并相同请求
const requestList = []
const CancelToken = axios.CancelToken
let sources = {}

// http request 拦截器
axios.interceptors.request.use(
  config => {
    const request = JSON.stringify(config.url) + JSON.stringify(config.method) + JSON.stringify(config.data || '')
    config.cancelToken = new CancelToken((cancel) => {
      sources[request] = cancel
    })
    if (requestList.includes(request)) {
      sources[request]('取消重复请求')
    } else {
      requestList.push(request)
      if (config.loading) {
        showFullScreenLoading()
      };
    }
    return config
  }, err => {
    return Promise.reject(err)
  }
)
// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    const request = JSON.stringify(response.config.url) + JSON.stringify(response.config.method) + JSON.stringify(response.config.data || '')
    requestList.splice(requestList.findIndex(item => item === request), 1)
    if (response.config.loading) {
      tryHideFullScreenLoading()
    };
    if (response.data.code === '00000000') {
    } else if (response.data.code === '00001111' || response.data.code === '11111111') {
      Message.error(response.data.message)
      localStorage.removeItem('webToken')
      localStorage.removeItem('userId')
      store.commit('setUser', {})
      router.push({
        name: 'Login'
      })
    } else {
      Message.error(response.data.message)
      endLoading()
    };
    return response
  },
  (error) => {
    if (loading !== undefined) {
      loading.close()
    };
    requestList.length = 0
    // Message.error('网络异常,请稍后再试');
    // throw new axios.Cancel('cancel request');
    return Promise.reject(error)
  }
)

// 封装get方法

function get (url, params = {}, loading = false) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
      loading: loading,
      headers: {
        'X-Token': localStorage.webToken
      }
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 封装post请求

function post (url, data = {}, loading = false) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
      loading: loading,
      headers: {
        'X-Token': localStorage.webToken
      }
    })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

// 封装patch请求

function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
// 封装 formData 表单提交
function postForm (url, formData, loading = true) {
  return new Promise((resolve, reject) => {
    axios.post(url, formData, {
      timeout: 0,
      headers: {
        'Authorization': 'Bearer ' + localStorage.webToken,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
// 封装put请求

function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data, {
      headers: {
        'zywxtoken': 'zywx' + localStorage.webToken
      }
    })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
// 封装delete请求

function todelete (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, { params: params })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://118.24.54.72:8061/' // 测试环境
axios.defaults.headers.Authorization = ''
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

export default { get, post, patch, put, todelete, postForm }

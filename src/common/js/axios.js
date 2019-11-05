
import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from '@/router/router'
import store from '@/store/store'

router.beforeEach((to, from, next) => {
  var elm = document.getElementById('bdshare_weixin_qrcode_dialog')
  if (elm) {
    elm.style.cssText = 'display:none'
  };
  if (to.name === 'Login') {
    to.query.relogin = from.name
  };
  if (to.meta.requireAuth) {
    if (localStorage.webToken) {
      /* 路由发生变化修改页面title */
      if (to.meta.title) {
        store.dispatch('get_web_config', to.meta.title)
      };
      next()
    } else {
      /* 路由发生变化修改页面title */
      if (to.meta.title) {
        store.dispatch('get_web_config', to.meta.title)
      };
      next({
        name: 'Login'
      })
    };
  } else {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      // document.title = to.meta.title;
      store.dispatch('get_web_config', to.meta.title)
      // document.title = store.state.config.site_name + to.meta.title;
    };
    next()
  };
})

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
    if (response.data.code === 200) {
    } else if (response.data.code === 202 || response.data.code === 203 || response.data.code === 204 || response.data.code === 205) {
      Message.error(response.data.msg)
      localStorage.removeItem('webToken')
      localStorage.removeItem('userId')
      store.commit('setUser', {})
      router.push({
        name: 'Login'
      })
    } else {
      Message.error(response.data.msg)
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

function get (url, params = {}, loading = true) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
      loading: loading,
      headers: {
        // 'zywxtoken': 'zywx' + localStorage.webToken
        'zywxtoken': 'zywxeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8venl3eC5hcGkuemhpeXVuODguY29tL2FwaS9hZG1pbi9sb2dpbiIsImlhdCI6MTU2MTAzMzA3NCwiZXhwIjoxNTYxNjM3ODc0LCJuYmYiOjE1NjEwMzMwNzQsImp0aSI6IlJjNFRNbGltdmdxdDZ3NDEiLCJzdWIiOjEsInBydiI6ImU1Mzg0Mjk4MzQ2MmJkODk1MmFlNTkyMzYzN2FjYTBlOTZiMjU5OGMifQ.gh2DtV0jQgAkZkFvA9HYVmcGmVXiWnoLSLAmzUqp7wc'
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

function post (url, data = {}, loading = true) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
      loading: loading,
      headers: {
        // 'zywxtoken': 'zywx' + localStorage.webToken
        'zywxtoken': 'zywxeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8venl3eC5hcGkuemhpeXVuODguY29tL2FwaS9hZG1pbi9sb2dpbiIsImlhdCI6MTU2MTAzMzA3NCwiZXhwIjoxNTYxNjM3ODc0LCJuYmYiOjE1NjEwMzMwNzQsImp0aSI6IlJjNFRNbGltdmdxdDZ3NDEiLCJzdWIiOjEsInBydiI6ImU1Mzg0Mjk4MzQ2MmJkODk1MmFlNTkyMzYzN2FjYTBlOTZiMjU5OGMifQ.gh2DtV0jQgAkZkFvA9HYVmcGmVXiWnoLSLAmzUqp7wc'

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
axios.defaults.baseURL = 'http://wangxiao33-sq.admin.zhouhaiyang.com/' // 测试环境
axios.defaults.headers.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vd2FuZ3hpYW8zMy1zcS5hZG1pbi56aG91aGFpeWFuZy5jb20vYXBpL2FkbWluVXNlci9sb2dpbiIsImlhdCI6MTU3MjkyNDMxNywiZXhwIjoxNTczMjI2NzE3LCJuYmYiOjE1NzI5MjQzMTcsImp0aSI6InNqcmJJb2RBNWN4am5uWk0iLCJzdWIiOjEsInBydiI6ImU1Mzg0Mjk4MzQ2MmJkODk1MmFlNTkyMzYzN2FjYTBlOTZiMjU5OGMifQ.z8VFyjtf10HSJ_p-yMIUgoHKUM5zOIUSI45xYSej0W8'

export default { get, post, patch, put, todelete }

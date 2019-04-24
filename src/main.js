import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1/'
<<<<<<< HEAD
axios.interceptors.request.use(function(config) {
  var token = window.sessionStorage.getItem('token')
  config.headers.Authorization = token
  return config
}, function(error) {
  return Promise.reject(error)
})
=======
axios.interceptors.request.use(
  function(config) {
    console.dir(config)
    // 给axios配置token
    var token = window.sessionStorage.getItem('token')
    if (token !== null) {
      config.headers.Authorization = token
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
>>>>>>> home
Vue.prototype.$http = axios

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

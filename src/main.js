import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
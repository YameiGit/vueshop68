import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/Users'
Vue.use(Router)
const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/', redirect: '/welcome' },   // 默认执行welcome路由
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',       // 默认执行welcome路由
      children: [
        { path: '/welcome', component: Welcome },
      ]
    }
  ]
})
 router.beforeEach((to, from, next) => {
  
  var token = window.sessionStorage.getItem('token')
  if (token === null && to.path !== '/login') {
    return next('/login')
  }
  next()
})
export default router

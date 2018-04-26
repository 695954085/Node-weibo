import Vue from 'vue'
import Router from 'vue-router'
import ShuoShuo from '@/components/ShuoShuo'
import Login from '@/components/Login'
import Regist from '@/components/Regist'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'ShuoShuo',
      component: ShuoShuo
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/regist',
      name: 'Regist',
      component: Regist
    }
  ]
})

export default router;

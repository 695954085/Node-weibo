import Vue from 'vue'
import Router from 'vue-router'
import ShuoShuo from '@/components/ShuoShuo'
import Login from '@/components/Login'
import Register from '@/components/Register'
import { mapState } from 'vuex'

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
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

export default router;

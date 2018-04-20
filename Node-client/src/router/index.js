import Vue from 'vue'
import Router from 'vue-router'
import ShuoShuo from '@/components/ShuoShuo'
import Login from '@/components/Login'

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
    }
  ]
})

router.beforeEach((to, from, next) => {

});

export default router;

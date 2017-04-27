import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Hello from '@/view/Hello'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./views/Auth.vue')
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('./views/QuestionPage.vue')
    },
  ]
})

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
      component: () => import('./views/QuestionPage.vue'),
    },
    {
      path: '/questions/myList',
      name: 'myList',
      component: () => import('./views/MyListQuestion.vue')
    },
    {
      path: '/questions/:questionId',
      name: 'oneQuestion',
      component: () => import('./views/QuestionDetails.vue'),
    },
    {
      path: '/answers/:questionId',
      name: 'answers',
      component: () => import('./views/AnswerPage.vue'),
    },
    {
      path: '/answers/:answerId',
      name: 'updateAnswer',
      component: () => import('./views/updateAnswer.vue'),
    },
  ]
})

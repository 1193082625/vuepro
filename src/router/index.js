import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Article from '@/components/article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    }
  ]
})

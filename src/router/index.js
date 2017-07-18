import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Article from '@/components/article'
import ArticleView from '@/components/articleView'

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
    },
    {
      path: '/articleView',
      name: 'ArticleView',
      component: ArticleView
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Article from '@/components/article'
import ArticleView from '@/components/articleView'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Article',
      component: Article
    },
    // {
    //   path: '/hello',
    //   name: 'Hello',
    //   component: Hello
    // },
    {
      path: '/articleView',
      name: 'ArticleView',
      component: ArticleView
    }
  ]
})
router.afterEach((route) => {
  // 路由跳转后触发
  // console.log(route)
})

export default router

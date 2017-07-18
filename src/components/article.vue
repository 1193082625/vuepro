<template>
  <div>
    <div class="col-sm-8">
      <h1>文章列表</h1>
      <ul v-if="articles">
        <li v-for="article in articles">
          <h3>{{ article.title }}</h3>
          <p>
            <span>作者：{{ article.user.username }}</span>
            <span>时间：{{ article.addTime }}</span>
            <span>阅读：{{ article.views }}</span>
            <span>评论：{{ article.message.length }}</span>
          </p>
          <p>
            <strong>简介：</strong>
            {{ article.description }}
          </p>
          <!--<a href="#/articleView">阅读全文</a>-->
          <router-link :to="{path:'articleView',query: {id:article._id}}">阅读全文</router-link>
        </li>
      </ul>
      <div class="pager">
        <ul class="clear">
          <li class="previous" v-if="page <=1">
            <a href="javascript:;">没有上一页了</a>
          </li>
          <li class="previous" v-else>
            <a href="javascript:;" @click="getList(page - 1, categoryType)">上一页</a>
          </li>
          <li v-if="pages > 0">
            <strong>{{page}} / {{pages}}</strong>
          </li>
          <li class="next" v-if="page >= pages">
            <a href="javascript:;">没有下一页了</a>
          </li>
          <li class="next" v-else>
            <a href="javascript:;" @click="getList(page + 1, categoryType)">下一页</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-4">
      <h3>分类</h3>
      <ul v-if="categories">
        <li>
          <a href="javascript:;" @click="getList(1, '')">全部</a>
        </li>
        <li v-for="category in categories">
          <a href="javascript:;" @click="getList(1, category._id)">{{category.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
  ul,li{
    list-style: none;
  }
</style>
<script>
  export default{
    data () {
      return {
        tips: '',
        articles: null,
        categories: null,
        categoryType: '',
        page: 1,
        limit: 10,
        count: 0,
        pages: 0
      }
    },
    created: function () {
//        页面初次加载请求后台第一页的数据
      this.getList(1, '')
      this.axios.get('/api/categoryList')
        .then((result) => {
          if (result.data.status === 1) {
            this.categories = result.data.categories
          }
        })
    },
    methods: {
      getList: function (newPage, category) {
        if (this.page !== newPage) {
          this.page = newPage
        }
        if (this.categoryType !== category) {
          this.categoryType = category
        }
        this.axios.get('/api/articleList', {
          params: {
            page: newPage,
            limit: this.limit,
            category: category
          }
        })
          .then((result) => {
            this.articles = result.data.articles
            this.count = result.data.count
            this.pages = result.data.pages
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>

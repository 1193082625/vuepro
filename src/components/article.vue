<template>
  <div>
    <h1>文章列表</h1>
    <ul v-if="articles">
      <li v-for="article in articles">
        {{ article.title }}
      </li>
    </ul>
    <!--<div class="pager">-->
      <!--<ul class="clear">-->
        <!--<li class="previous" v-if="page <=1">-->
          <!--<a href="javascript:;">没有上一页了</a>-->
        <!--</li>-->
        <!--<li class="previous" v-else>-->
          <!--<a :href="url+(page - 1)">上一页</a>-->
        <!--</li>-->
        <!--<li v-if="pages > 0">-->
          <!--<strong>{{page}} / {{pages}}</strong>-->
        <!--</li>-->
        <!--<li class="next" v-if="page >= pages">-->
          <!--<a href="javascript:;">没有下一页了</a>-->
        <!--</li>-->
        <!--<li class="next" v-else>-->
          <!--<a :href="url+(page + 1)">下一页</a>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
  </div>
</template>
<script>
  export default{
    data () {
      return {
        tips: '',
        articles: null,
        page: 1,
        count: 0,
        pages: 0,
        url: '/artcile?page='
      }
    },
    created: function () {
      this.axios.get('/api/articleList')
        .then((result) => {
//          this.articles = articles
          console.log(result)
          this.articles = result.data.articles
          this.page = result.data.page
          this.count = result.data.count
          this.pages = result.data.pages
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
</script>

<template>
  <div v-if="article">
    <router-link v-if="preArticleId" :to="{path:'articleView',query: {id:preArticleId}}">上一篇</router-link>
    <router-link v-if="nextArticleId" :to="{path:'articleView',query: {id:nextArticleId}}">下一篇</router-link>
    <div>
      <h1>{{ article.title }}</h1>
      <p>
        <span>作者：{{ article.user.username }}</span>
        <span>时间：{{ article.addTime| formaData }}</span>
        <span>阅读：{{ article.views }}</span>
        <span>评论：{{ article.message.length }}</span>
      </p>
      <div v-html="article.content"></div>
    </div>
    <br>
    <br>
    <br>
    <div class="relativeArticles" v-if="relativeArticles">
      <h3>相关文章</h3>
      <ul>
        <li v-for="relativeArticle in relativeArticles">
          <router-link :to="{path:'articleView',query: {id:relativeArticle._id}}">
            <strong>{{relativeArticle.title}}</strong>
            <span>{{relativeArticle.addTime| formaData}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <br>
    <br>
    <br>
    <div class="listBox message">
      <h3 class="textLeft">
        <strong class="pull-left">评论</strong>
        <span class="em pull-right">一共有 <em id="messageCount">{{msgLength}}</em>条评论</span>
      </h3>
      <div class="clear"></div>
      <p class="textLeft clear">
        <textarea id="messageContent" rows="5"></textarea>
        <button id="messageBtn" class="submit" @click="commitMsg">提交</button>
      </p>
      <div class="messageList" v-if="msgLength <= 0">
        <div class="messageBox"><p>还没有评论</p></div>
      </div>
      <div class="messageList" v-else>
        <div class="messageBox" v-for="comment in perComments">
          <p class="name clear">
            <span class="fr"> {{comment.time | formaData}} </span>
          </p>
          <p>{{comment.content}}</p>
        </div>
      </div>
      <div class="pager">
        <ul class="clear">
          <li class="previous" v-if="page <= 1">
            <span>没有上一页了</span>
          </li>
          <li class="previous" v-else>
            <a href="javascript:;" @click="changePage('pre')">上一页</a>
          </li>
          <li>
            {{page}} / {{pages}}
          </li>
          <li class="next" v-if="page >= pages">
            <span>没有下一页了</span>
          </li>
          <li class="next" v-else>
            <a href="javascript:;"  @click="changePage('next')">下一页</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style>
  #messageBtn{
    display: table;
    margin: 20px auto;
  }
  #messageContent{
    width: 100%;
    margin-top: 20px;
  }
  .relativeArticles li{
    line-height: 30px;
    display: table;
    width: 100%;
  }
  .relativeArticles li strong{
    float: left;
    display: block;
    font-weight: normal;
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .relativeArticles li span{
    display: block;
    float: right;
    color: #999;
  }
</style>
<script>
  export default{
    data () {
      return {
        article: null,
        prepage: 2,
        page: 1,
        pages: 0,
        comments: [],
        id: '',
        msgLength: 0,
        perComments: [],
        preArticleId: '',
        nextArticleId: '',
        relativeArticles: ''
      }
    },
    created: function () {
      this.id = this.$route.query.id
      this.axios.get('/api/articleView', {
        params: {
          id: this.id
        }
      })
      .then((result) => {
        this.preArticleId = result.data.preArticleId
        this.nextArticleId = result.data.nextArticleId
        this.article = result.data.article
        this.relativeArticles = result.data.relativeArticles
        this.comments = result.data.article.message.reverse()
        this.msgLength = this.comments.length
        this.renderComment()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    methods: {
//      methods 里面箭头函数中的 this 不是指向 vue 实例
      commitMsg: function () {
        var self = this
        this.axios.post('/api/commitMsg', {
          id: this.id,
          content: $('#messageContent').val()
        })
        .then(function (result) {
          if (result.data.status === 1) {
            alert('评论成功')
            $('#messageContent').val('')
            self.comments = result.data.data.message.reverse()
            self.msgLength = result.data.data.message.length
            self.renderComment()
          }
        })
        .catch(function (response) {
          console.log(response)
        })
      },
      changePage: function (action) {
        var self = this
        if (action === 'next') {
          self.page++
        } else {
          self.page--
        }
        self.renderComment()
      },
      renderComment: function () {
        var self = this
        self.perComments = []
        self.pages = Math.max(Math.ceil(self.msgLength / self.prepage), 1)
        var start = Math.max(0, (self.page - 1) * self.prepage)
        var end = Math.min(start + self.prepage, self.msgLength)

        if (self.page <= 1) {
          self.page = 1
        }
        if (self.page >= self.pages) {
          self.page = self.pages
        }
        if (self.msgLength > 0) {
          for (var i = start; i < end; i++) {
            self.perComments.push({'time': self.comments[i].postTime, 'content': self.comments[i].content})
          }
        }
      }
    },
    filters: {
      formaData: (d) => {
        var date1 = new Date(d)
        return date1.getFullYear() + '年' + (date1.getMonth() + 1) + '月' + date1.getDate() + '日' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds()
      }
    }
  }
</script>

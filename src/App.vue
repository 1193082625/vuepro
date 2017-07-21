<template>
  <div>
    <!--<img src="./assets/logo.png">-->
    <div id="app">
      <HtmlHeader></HtmlHeader>
      <router-view :key="key" style="min-height: 780px"></router-view>
    </div>
    <HtmlFooter></HtmlFooter>
  </div>
</template>

<script>
  import HtmlHeader from './components/header'
  import HtmlFooter from './components/footer'
export default {
    name: 'app',
    components: {
      HtmlHeader,
      HtmlFooter
    },
    computed: {
      key () {
//          判断如果是文章详情页，则在路由后添加时间让页面刷新
        return this.$route.name === 'ArticleView' ? this.$route.name + new Date() : this.$route
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding: 20px;
}
ul,li{
  margin: 0;
  padding: 0;
  list-style: none;
}
.clear{
  clear:both
}
</style>

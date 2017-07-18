<template>
  <div id="app">
    <HtmlHeader></HtmlHeader>
    <!--<img src="./assets/logo.png">-->
    <router-view style="min-height: 500px"></router-view>
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
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

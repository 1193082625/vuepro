<template>
  <!-- Fixed navbar -->
  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">{{ msg }}</a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li class="active"><a href="/">首页</a></li>
          <li><a href="#/login">登录</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">会员 <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="#/login">登录</a></li>
              <li><a href="#/register">注册</a></li>
            </ul>
          </li>
        </ul>
      </div><!--/.nav-collapse -->
    </div>
  </nav>
</template>
<script>
  export default {
    name: 'header',
    data () {
      return {
        msg: 'LOGO'
      }
    }
  }
</script>

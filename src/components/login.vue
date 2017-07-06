<template>
  <form class="form-horizontal" role="form" onSubmit="return false">
    <div class="form-group">
      <label for="inputEmail3" class="col-sm-2 control-label">名字</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="inputEmail3" placeholder="请输入账号" v-model="account">
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-2 control-label">姓</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="password">
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-default" @click="register">注册</button>
      </div>
    </div>
  </form>

</template>
<script>
  export default {
    data () {
      return {
        account: '',
        password: ''
      }
    },
    created: function () {
//      this.$http.get('/api/login/getAccount')
//        .then((response) => {
//          console.log(response)
//        })
//        .catch((reject) => {
//          console.log(reject)
//        })
      this.axios.get('/api/login/getAccount')
        .then((response) => {
          console.log(response)
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    methods: {
      register () {
        let params = {
          account: this.account,
          password: this.password
        }
        this.$http.post('/api/login/createAccount', params)
          .then((response) => {
            console.log(response)
          })
          .catch((reject) => {
            console.log(reject)
          })
      }
    }
}
</script>

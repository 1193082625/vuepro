/**
 * Created by Administrator on 2017/7/6.
 */
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27020/vuepro', function (err) {
  if (err) {
    console.log('数据库连接失败')
  } else {
    console.log('数据库连接成功')
  }
})

const loginSchema = mongoose.Schema({
  account: String,
  password: String
})

const Models = {
  Login: mongoose.model('Login', loginSchema)
}

module.exports = Models

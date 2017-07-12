/**
 * Created by Administrator on 2017/7/6.
 */
const bodyParse = require('body-parser')
const swig = require('swig')
const express = require('express')
const mongoose = require('mongoose')
const Cookies = require('cookies')
const app = express()

app.use('/public', express.static('public'))

app.engine('html', swig.renderFile)

app.set('views', 'admin')
app.set('view engine', 'html')

swig.setDefaults({cache: false})

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
// app.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走/dist/index.html
// app.get('*', function (req, res) {
//   const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
//   res.send(html)
// })
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended: false}))

app.use(function (req, res, next) {
  req.cookies = new Cookies(req, res)
  if (req.cookies.get('userInfo')) {
    try {
      req.userInfo = JSON.parse(req.cookies.get('userInfo'))
      next()
    } catch (e) {
      next()
    }
  } else {
    next()
  }
})

app.use('/api', require('./routers/api'))
app.use('/admin', require('./routers/admin'))

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27020/vuepro', function (err) {
  if (err) {
    console.log('数据库连接失败')
  } else {
    console.log('数据库连接成功')
// 监听8088端口
    app.listen(8088)
  }
})

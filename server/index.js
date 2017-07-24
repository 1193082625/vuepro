/**
 * Created by Administrator on 2017/7/6.
 */
const bodyParse = require('body-parser')
const swig = require('swig')
const express = require('express')
const mongoose = require('mongoose')
const Cookies = require('cookies')
const ueditor = require('ueditor')
const http = require('http')
const httpProxy = require('http-proxy')
var path = require('path')
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
app.use(bodyParse.urlencoded({extended: true}))

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
app.use('/', require('./routers/admin'))

// 加载ueditor 模块
// ueditor上传文件到后台
app.use('/ueditor/ue', ueditor(path.join(__dirname, 'public'), function (req, res, next) {
// ueditor 客户发起上传图片请求
  if (req.query.action === 'uploadimage') {
    var foo = req.ueditor
    var imgname = req.ueditor.filename
    var img_url = '/upload/images'
    // 你只要输入要保存的地址 。保存操作交给ueditor来做
    res.ue_up(img_url)
  } else if (req.query.action === 'uploadfile') {
    // 上传文件请求
    var file_url = '/upload/file' // 附件
    res.ue_up(file_url)
  } else if (req.query.action === 'uploadvideo') {
    // 上传视频请求
    var video_url = '/upload/video' // 附件
    res.ue_up(video_url)
  } else if (req.query.action === 'listimage') {
    //  客户端发起图片列表请求
    var dir_url = '/upload/images'
    // 客户端会列出 dir_url 目录下的所有图片
    res.ue_list(dir_url)
  } else {
    // 客户端发起其它请求
    res.setHeader('Content-Type', 'application/json')
    res.redirect('/public/ueditor/nodejs/config.json')
  }
}))

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27020/vuepro', function (err) {
  if (err) {
    console.log('数据库连接失败')
  } else {
    console.log('数据库连接成功')
    // 监听8088端口
    app.listen(8088)
    // http-proxy代理
    /**
     * 加上这段代码页面可以正常访问但是后台文章页上传文件时会出错，所以暂时注释了
     * 用域名访问时，要确保80端口没有被其他程序占用
    //  */
    // var  proxy = httpProxy.createProxyServer()
    // proxy.on(function(err, req, res) { res.writeHead(500, { 'Content-Type': 'text/plain' }) })
    // http.createServer(function (req, res) {
    //   var host = req.headers.host
    //   if (host === 'www.blog.com') {
    //     proxy.web(req, res, { target: 'http://localhost:8080' }, function (e) {
    //       console.log(e)
    //     })
    //   }
    //   // switch (host) {
    //   //   case 'www.adminblog.com':
    //   //     proxy.web(req, res, { target: 'http://localhost:8088/' }, function (e) {
    //   //       console.log(e)
    //   //     })
    //   //     break
    //   //   case 'www.blog.com':
    //   //     proxy.web(req, res, { target: 'http://localhost:8080' }, function (e) {
    //   //       console.log(e)
    //   //     })
    //   //     break
    //   //   default:
    //   //     res.writeHead(200, { 'Content-Type': 'text/plain' })
    //   //     res.end('Welcome to my server!')
    //   // }
    // }).listen(80)
  }
})

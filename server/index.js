/**
 * Created by Administrator on 2017/7/6.
 */
const api = require('./api')
const fs = require('fs')
const path = require('path')
const bodyParse = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended: false}))
app.use(api)
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})
// 监听8088端口
app.listen(8088)

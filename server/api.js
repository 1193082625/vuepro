/**
 * Created by Administrator on 2017/7/6.
 */

'use strict'
const models = require('./db')
const express = require('express')
const router = express.Router()

// 创建账号接口
router.post('/api/login/createAccount', (req, res) => {
  if (req.body.account === '') {
    res.send('账号不能为空')
    return
  }
  if (req.body.password === '') {
    res.send('密码不能为空')
    return
  }

  let newAccount = new models.Login({
    account: req.body.account,
    password: req.body.password
  })
  // 保存数据newAccount数据进mongoDB
  newAccount.save((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send('createAccount successed')
    }
  })
})
// 获取已有账号接口
router.get('/api/login/getAccount', (req, res) => {
  models.Login.find((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})
module.exports = router
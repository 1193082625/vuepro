/**
 * Created by Administrator on 2017/7/6.
 */
'use strict'
const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const User = require('../models/User')

var responseData

router.use(function (req, res, next) {
  responseData = {
    status: 0,
    message: ''
  }
  next()
})

// 获取已有账号接口
router.get('/login/getAccount', (req, res) => {
  User.find((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

/**
 * 注册
 */
router.post('/register', (req, res) => {
  var username = req.body.username

  if (username === '') {
    res.send('账号不能为空')
    return
  }
  if (req.body.password === '') {
    res.send('密码不能为空')
    return
  }
  // 当用户注册时，将用户提交的密码先不可逆加密，然后将密文保存在数据库内
  var password = crypto.createHash('md5').update(req.body.password).digest('hex')

  // 用户名是否已经被注册，如果数据库中已经存在要注册的用户名同名的数据，标识该用户名已经被注册了
  User.findOne({
    username: username
  }).then(function (userInfo) {
    if (userInfo) {
      responseData.message = '用户名已被注册'
      res.json(responseData)
      return
    }
    var user = new User({
      username: username,
      password: password
    })
    return user.save()
  }).then(function (newuserInfo) {
    responseData.status = 1
    responseData.message = '注册成功'
    res.json(responseData)
  }).catch(function (err) {
    console.log(err)
  })
})

/**
 * 登录
 */
router.post('/login', (req, res) => {
  var username = req.body.username

  if (username === '') {
    res.send('账号不能为空')
    return
  }
  if (req.body.password === '') {
    res.send('密码不能为空')
    return
  }
  // 当用户登录时，将用户提交的密码先以相同方式加密，然后与数据库中的密文比对，来判断密码的正误
  var password = crypto.createHash('md5').update(req.body.password).digest('hex')

  User.findOne({
    username: username,
    password: password
  }).then((userInfo) => {
    if (!userInfo) {
      responseData.message = '用户名或密码错误'
      res.json(responseData)
      return
    } else {
      responseData.status = 1
      responseData.message = '登录成功'
      responseData.userInfo = {
        _id: userInfo._id,
        username: userInfo.username
      }
      req.cookies.set('userInfo', JSON.stringify({
        _id: userInfo._id,
        username: userInfo.username
      }))
      res.json(responseData)
      return
    }
  }).catch(function (err) {
    console.log(err)
  })
})

// 退出登录
router.get('/logout', (req, res) => {
  req.cookies.set('userInfo', null)
  responseData.status = 1
  res.json(responseData)
})

module.exports = router

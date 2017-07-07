/**
 * Created by Administrator on 2017/7/7.
 */
'use strict'
const express = require('express')
const router = express.Router()
// const User = require('../models/User')

// 获取已有账号接口
router.get('/', (req, res) => {
  res.render('index', {
    userInfo: req.userInfo
  })
})

router.use(function (req, res, next) {
  if (req.userInfo === undefined) {
    res.render('admin/error', {
      message: '要执行操作，请先登录',
      url: '/admin'
    })
  } else {
    next()
  }
})

module.exports = router

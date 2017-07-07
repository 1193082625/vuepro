/**
 * Created by Administrator on 2017/7/7.
 */
'use strict'
const express = require('express')
const router = express.Router()

// 获取已有账号接口
router.get('/', (req, res) => {
  res.render('index')
})
module.exports = router

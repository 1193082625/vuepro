/**
 * Created by Administrator on 2017/7/6.
 */
'use strict'
const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const mongoose = require('mongoose')
const User = require('../models/User')
const Article = require('../models/Article')
const Category = require('../models/Category')

var responseData

router.use(function (req, res, next) {
  responseData = {
    status: 0,
    message: ''
  }
  next()
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

/**
 * 重置密码
 * 密码重置为123456blog
 */
router.post('/resetPsw', (req, res) => {
  var username = req.body.username
  if (username === '') {
    res.send('账号不能为空')
    return
  }
  // 当用户登录时，将用户提交的密码先以相同方式加密，然后与数据库中的密文比对，来判断密码的正误
  var password = crypto.createHash('md5').update('123456blog').digest('hex')
  User.findOne({
    username: username
  }).then(function (userInfo) {
    if (!userInfo) {
      responseData.message = '没有该用户'
      res.json(responseData)
      return
    } else {
      return User.update({
        username: username
      }, {
        password: password
      })
    }
  }).then(() => {
    responseData.status = 1
    responseData.message = '密码重置成功'
    res.json(responseData)
    return
  }).catch((err) => {
    console.log(err)
  })
})
// 退出登录
router.get('/logout', (req, res) => {
  req.cookies.set('userInfo', null)
  responseData.status = 1
  res.json(responseData)
})

/**
 * 文章列表
 */
router.get('/articleList', (req, res) => {
  var page = Number(req.query.page || 1)
  var limit = Number(req.query.limit || 10)
  var categoryType = req.query.category
  var pages = 0
  var where = {}

  if (categoryType) {
    where.category = categoryType
  }
  Article.where(where).count().then((count) => {
    // 获取总页数
    pages = Math.ceil(count / limit)
    // 取值不能超过总页数
    page = Math.min(page, pages)
    // 取值不能小于1
    page = Math.max(1, page)
    var skip = (page - 1) * limit

    return Article.where(where).find().sort({addTime: -1}).limit(limit).skip(skip).populate(['category', 'user'])
  }).then((articles) => {
    responseData.articles = articles
    responseData.count = articles.length
    responseData.pages = pages
    res.json(responseData)
  }).catch((err) => {
    responseData.status = 0
    responseData.msg = err
    res.json(responseData)
  })
})
/**
 * 获取分类
 */
router.get('/categoryList', (req, res) => {
  Category.find().then((categies) => {
    responseData.status = 1
    responseData.categories = categies
    res.json(responseData)
  })
})

/**
 * 文章详情
 */
router.get('/articleView', (req, res, next) => {
  var articleId = req.query.id || ''
  responseData.nextArticleId = ''
  responseData.preArticleId = ''
  var where = {}
  Article.find({
    _id: {'$lt': mongoose.Types.ObjectId(articleId)}
  }).sort({addTime: -1}).limit(1).then((nextArticles) => {
    if (nextArticles.length > 0) {
      responseData.nextArticleId = nextArticles[0]._id
    }
  }).catch((err) => {
    console.log(err)
  })
  Article.find({
    _id: {'$gt': mongoose.Types.ObjectId(articleId)}
  }).sort({addTime: -1}).limit(1).then((preArticles) => {
    if (preArticles.length > 0) {
      responseData.preArticleId = preArticles[0]._id
    }
  }).catch((err) => {
    console.log(err)
  })
  Article.findOne({
    _id: articleId
  }).populate(['category', 'user']).then((article) => {
    where.category = article.category._id
    where._id = {'$ne': mongoose.Types.ObjectId(article._id)}
    Article.where(where).find().sort({addTime: -1}).limit(5).then((relativeArticles) => {
      if (relativeArticles) {
        responseData.relativeArticles = relativeArticles
      } else {
        responseData.relativeArticles = ''
      }
      responseData.article = article
      article.views++
      article.save()
      res.json(responseData)
    }).catch((err) => {
      console.log(err)
    })
  }).catch((err) => {
    console.log(err)
  })
})

/**
 * 评论提交
 */
router.post('/commitMsg', (req, res) => {
  var articleId = req.body.id || ''
  var postData = {
    postTime: new Date(),
    content: req.body.content
  }
  // console.log(articleId)
  Article.findOne({
    _id: articleId
  }).then((article) => {
    article.message.push(postData)
    return article.save()
  }).then((newArticle) => {
    responseData.status = 1
    responseData.message = '评论成功'
    responseData.data = newArticle
    res.json(responseData)
  })
})

module.exports = router

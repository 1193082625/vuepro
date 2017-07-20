/**
 * Created by Administrator on 2017/7/7.
 */
'use strict'
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Category = require('../models/Category')
const Article = require('../models/Article')
var data = {
  limit: 2,
  backupArticles: null
}
// 获取已有账号接口
router.get('/', (req, res) => {
  res.render('index', {
    userInfo: req.userInfo
  })
})

router.use(function (req, res, next) {
  if (req.userInfo === undefined) {
    res.render('error', {
      message: '要执行操作，请先登录',
      url: '/'
    })
  } else {
    next()
  }
})

/**
 * 分类
 */
router.get('/category', (req, res) => {
  var page = Number(req.query.page || 1)
  // var limit = 10
  var pages = 0

  Category.count().then((count) => {
    // 获取总页数
    pages = Math.ceil(count / data.limit)
    // 取值不能超过pages
    page = Math.min(page, pages)
    // 取值不能小于1
    page = Math.max(page, 1)

    var skip = (page - 1) * data.limit
    /*
     *sort 排序
     * 1:升序
     * -1: 降序
     * */
    Category.find().sort({_id: -1}).limit(data.limit).skip(skip).then((categories) => {
      res.render('category/index', {
        userInfo: req.userInfo,
        categories: categories,

        pageName: 'category',
        page: page,
        count: count,
        pages: pages,
        limit: data.limit
      })
    })
  }).catch((err) => {
    console.log(err)
  })
})

/**
 * 添加分类页
 */
router.get('/category/create', (req, res) => {
  res.render('category/create', {
    userInfo: req.userInfo
  })
})

/**
 * 保存分类
 */
router.post('/category/create', (req, res) => {
  var cName = req.body.cName

  Category.findOne({
    name: cName
  }).then((result) => {
    if (result) {
      res.render('error', {
        userInfo: req.userInfo,
        message: '该分类已存在'
      })
      return Promise.reject()
    } else {
      var category = new Category({
        name: cName
      })
      return category.save()
    }
  }).then((newCategory) => {
    res.render('success', {
      userInfo: req.userInfo,
      message: '分类保存成功',
      url: '/category'
    })
  }).catch((err) => {
    console.log(err)
  })
})
/**
 * 修改分类
 */
router.get('/category/edit', (req, res) => {
  var id = req.query.id || ''

  Category.findOne({
    _id: id
  }).then((category) => {
    if (!category) {
      res.render('error', {
        userInfo: req.userInfo,
        message: '分类信息不存在'
      })
      return Promise.reject()
    } else {
      res.render('category/edit', {
        userInfo: req.userInfo,
        category: category
      })
    }
  }).catch((err) => {
    console.log(err)
  })
})

/**
 * 保存分类的修改
 */
router.post('/category/edit', (req, res) => {
  var id = req.query.id || ''
  var name = req.body.cName || ''

  Category.findOne({
    _id: id
  }).then((category) => {
    if (!category) {
      res.render('error', {
        userInfo: req.userInfo,
        message: '分类信息不存在'
      })
      return Promise.reject()
    } else {
      if (name === category.name) {
        res.render('success', {
          userInfo: req.userInfo,
          message: '修改成功',
          url: '/category'
        })
        return Promise.reject()
      } else {
        return Category.findOne({
          _id: {$ne: id},
          name: name
        })
      }
    }
  }).then((sameCategory) => {
    if (sameCategory) {
      res.render('error', {
        userInfo: req.userInfo,
        message: '已存在同名分类'
      })
      return Promise.reject()
    } else {
      return Category.update({
        _id: id
      }, {
        name: name
      })
    }
  }).then(() => {
    res.render('success', {
      userInfo: req.userInfo,
      message: '修改成功',
      url: '/category'
    })
  }).catch((err) => {
    console.log(err)
  })
})
/**
 * 删除分类
 */
router.get('/category/delete', (req, res) => {
  var id = req.query.id || ''
  Category.remove({
    _id: id
  }).then(() => {
    res.render('success', {
      userInfo: req.userInfo,
      message: '删除成功',
      url: '/category'
    })
  }).catch((err) => {
    console.log(err)
  })
})

/**
 * 文章首页
 */

router.get('/article', (req, res) => {
  var page = Number(req.query.page || 1)
  // var limit = 2
  var pages = 0

  Article.count().then((count) => {
    // 获取总页数
    pages = Math.ceil(count / data.limit)
    // 取值不能超过pages
    page = Math.min(page, pages)
    // 取值不能小于1
    page = Math.max(page, 1)

    var skip = (page - 1) * data.limit
    /*
     *sort 排序
     * 1:升序
     * -1: 降序
     * */
    Article.find().sort({addTime: -1}).limit(data.limit).skip(skip).populate(['category', 'user']).then((articles) => {
      res.render('article/index', {
        userInfo: req.userInfo,
        articles: articles,

        pageName: 'article',
        page: page,
        count: count,
        pages: pages,
        limit: data.limit
      })
    })
  }).catch((err) => {
    console.log(err)
  })
})

/**
 * 添加文章
 */
router.get('/article/create', (req, res) => {
  Category.find().sort({_id: -1}).then((categories) => {
    res.render('article/create', {
      userInfo: req.userInfo,
      categories: categories
    })
  })
})

/**
 * 保存文章
 */
router.post('/article/create', (req, res) => {
  new Article({
    title: req.body.title,
    category: req.body.category,
    user: req.userInfo._id.toString(),
    description: req.body.description,
    content: req.body.content
  }).save().then((result) => {
    res.render('success', {
      userInfo: req.userInfo,
      message: '文章保存成功',
      url: '/article'
    })
  }).catch((err) => {
    console.log(err)
  })
})
/**
 * 查看文章详情
 */
router.get('/article/view', (req, res) => {
  var id = req.query.id || ''
  Article.findOne({
    _id: id
  }).populate(['category', 'user']).then((article) => {
    if (!article) {
      res.render('error', {
        userInfo: req.userInfo,
        message: '文章不存在'
      })
    } else {
      res.render('article/view', {
        userInfo: req.userInfo,
        article: article
      })
    }
  }).catch((err) => {
    console.log(err)
  })
})

/**
 * 修改文章
 */
router.get('/article/edit', (req, res) => {
  var id = req.query.id || ''
  var categories = []

  Category.find().sort({_id: -1}).then((rs) => {
    categories = rs
    // 获取要修改的分类信息
    return Article.findOne({
      _id: id
    }).populate('category')
  }).then((article) => {
    if (!article) {
      res.render('error', {
        userInfo: req.userInfo,
        message: '文章不存在'
      })
      return Promise.reject()
    } else {
      res.render('article/edit', {
        userInfo: req.userInfo,
        article: article,
        categories: categories
      })
    }
  })
})

/**
 * 保存修改
 */
router.post('/article/edit', (req, res) => {
  var id = req.query.id || ''

  Article.update({
    _id: id
  }, {
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    content: req.body.content
  }).then(() => {
    res.render('success', {
      userInfo: req.userInfo,
      message: '文章修改成功',
      url: '/article/edit?id=' + id
    })
  })
})

/**
 * 删除
 */
router.get('/article/delete', (req, res) => {
  var id = req.query.id || ''
  Article.remove({
    _id: id
  }).then(() => {
    res.render('success', {
      userInfo: req.userInfo,
      message: '文章删除成功',
      url: '/article'
    })
  }).catch((err) => {
    console.log(err)
  })
})

module.exports = router

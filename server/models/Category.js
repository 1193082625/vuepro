/**
 * Created by Administrator on 2017/7/12.
 */
var mongoose = require('mongoose')

var categorySchema = require('../schemas/category')

module.exports = mongoose.model('Category', categorySchema)

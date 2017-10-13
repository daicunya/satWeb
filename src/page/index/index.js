/**
 * Created by daicunya on 2017/9/17.
 */

'use strict';

require('./index.styl');
require('../common/footer/index.js');

var $ = require('util/js/zepto.min.js');
var slider = require('page/common/slider/index.js');
var _util = require('util/util.js');

//请求数据,模拟
// _util.request({
//   url: 'http://sat.com/cn/wap-api/exer-index',
//   success: function (res) {
//     console.log(res);
//   },
//   error: function (res) {
//     console.log(res);
//   }
// });

var _home = {
  init: function () {

  }
}
$(function () {
  // 渲染banner的html
  _home.init();
})
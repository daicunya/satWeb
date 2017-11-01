/**
 * Created by daicunya on 2017/10/30.
 */
'use strict';
require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _util = require('util/util.js');
var _utilService = require('service/util-service.js');
var template = require('./index.string');

$(function () {
  var rendHtml = '',
      id = _util.getUrlParam('id');
  _utilService.courseDetails(id,function (res) {
    rendHtml = _util.renderHtml(template,{
      dataList : res
    });
    $('.course-details').html(rendHtml);
  })
})

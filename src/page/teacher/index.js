/**
 * Created by daicunya on 2017/10/31.
 */
'use strict';
require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');
var _util             = require('util/util.js');
var _utilService = require('service/util-service.js');
var template    = require('./index.string');

$(function () {
  var rendHtml = '';
  _utilService.teacher(function (res) {
    console.log(res);
    rendHtml = _util.renderHtml(template,{
      dataList : res
    });
    $('.teacher .list').html(rendHtml);
  })
})
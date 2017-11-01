/**
 * Created by daicunya on 2017/10/31.
 */
'use strict';
require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');
var _util = require('util/util.js');
var _utilService = require('service/util-service.js');
var template = require('./index.string');
$(function () {
  _utilService.pubClass(function (res) {
    console.log(res);
    var rendHtml = '';
    $.each(res.new,function (i,data) {
      data.publishTime = new Date(parseInt(data.publishTime) * 1000).toLocaleString('chinese',{hour12:false}).replace(/[/]/g,'-');
    });
    $.each(res.history,function (i,data) {
      data.publishTime = new Date(parseInt(data.publishTime) * 1000).toLocaleString('chinese',{hour12:false}).replace(/[/]/g,'-');
    });
    rendHtml = _util.renderHtml(template,{
      dataList : res
    })
    $('.pubClass').html(rendHtml);
  })
})
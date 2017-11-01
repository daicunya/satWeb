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

var _course = {
  init : function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad : function () {
    this.loadCourse();
  },
  bindEvent : function () {

  },
  loadCourse : function () {
    var rendHtml = '';
    _utilService.courseIndex(function (res) {
      console.log(res);
      rendHtml = _util.renderHtml(template,{
        dataList : res
      })
      $('.course').html(rendHtml);
    })
  }
};
$(function () {
  _course.init();
})

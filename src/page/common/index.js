/**
 * Created by daicunya on 2017/9/17.
 */
'use strict';

require('./public.styl');
require('node_modules/font-awesome/css/font-awesome.min.css');
require('node_modules/animate.css/animate.min.css');
var $ = require('util/js/zepto.min.js');

var _public = {
  init: function () {
    this.bindEvent();
  },
  bindEvent: function () {
    var _this = this;
    this.tagEvent();
  },
  //标签切换事件
  tagEvent: function () {
    $('.p-tag-list>li').tap(function () {
      var i = $(this).index();
      $('.p-tag-list>li').removeClass('active');
      $(this).addClass('active');
      $('.p-tag-cnt>li').hide();
      $('.p-tag-cnt>li').eq(i).show();
    })
  }
};
$(function () {
  _public.init();
})
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
    this.onLoad();
    this.bindEvent();
  },
  onLoad : function () {
    var url = window.location.href;
    if (url == 'http://m.thinkusat.com/dist/view') {
      location.href = 'http://m.thinkusat.com/dist/view/index.html';
    }
  },
  bindEvent: function () {
    this.tagEvent();
    $('.p-to-top').tap(function () {
      $('html').scrollTop(0);
    })
  },
  //标签切换事件
  tagEvent: function () {
    $('.p-tag-list>li').tap(function () {
      var i = $(this).index();
      $(this).addClass('active').siblings().removeClass('active');
      $('.p-tag-cnt>li').eq(i).show().siblings().hide();
    })
  }
};
$(function () {
  _public.init();
});
window.onscroll = function () {
  if ($('html').scrollTop() >= $('html').height()/3) {
    $('.p-to-top').show();
  } else {
    $('.p-to-top').hide();
  }
}

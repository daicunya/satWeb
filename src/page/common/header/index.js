/**
 * Created by daicunya on 2017/9/21.
 */
'use strict';

require('./index.styl');
// var $ = require('util/js/zepto.min.js');

var _header = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    var tName = window.location.pathname;
    if (tName.indexOf('exercise') != -1) {
      $('.p-title').html('练习');
    } else if(tName.indexOf('mockNote') != -1){
      $('.p-title').html('考前说明');
    } else if (tName.indexOf('evaulation') != -1) {
      $('.p-title').html('测评');
    } else if (tName.indexOf('knowledge') != -1) {
      $('.p-title').html('知识库');
    } else if (tName.indexOf('course') != -1) {
      $('.p-title').html('SAT课程');
    } else if (tName.indexOf('pubClass') != -1) {
      $('.p-title').html('公开课');
    } else if (tName.indexOf('information') != -1) {
      $('.p-title').html('文章资讯');
    } else if (tName.indexOf('teacher') != -1) {
      $('.p-title').html('名师团队');
    } else if (tName.indexOf('mock') != -1) {
      $('.p-title').html('模考');
    }
  },
  bindEvent: function () {
    $('.header-btn').tap(function () {
      $('.header-nav').toggleClass('active animated bounce');
      $('.p-shade').toggleClass('active animated fadeIn');
    })
  }
};
$(function () {
  _header.init();
})



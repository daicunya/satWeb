/**
 * Created by daicunya on 28/09/2017.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _util = require('util/util.js');
var _topicService = require('service/topic-service.js');
var templateIndex = require('./index.string');

var _mock = {
  init: function () {
    this.loadList();
    this.bindEvent();
  },
  //加载模考列表数据
  loadList: function () {
    var listHtml = '',
        $exerCnt = $('.exer-cnt');
    $exerCnt.html('正在加载中……');
    _topicService.mockIndex('',function (res) {
      console.log(res);
      listHtml = _util.renderHtml(templateIndex,{
        mockList : res
      });
      $exerCnt.html(listHtml);
    }),function (err) {
      console.log(err);
    }
  },
  bindEvent: function () {
    $('.exer-cnt').bind('tap','.j-mock-item>dt',function () {
      $('.j-mock-item dd').css('height',0);
      $(this).siblings('dd').css('height','100%');
    })
  }
};
$(function () {
  _mock.init();
})

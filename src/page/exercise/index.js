/**
 * Created by daicunya on 2017/9/27.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _util = require('util/util.js');
var _topicService = require('service/topic-service.js');
var templateIndex = require('./index.string');

var _exer = {
  init: function () {
    this.loadList();
    this.bindEvent();
  },
  //加载练习列表数据
  loadList: function () {
    var listHtml = '',
        $exerCnt = $('.exer-cnt');
    $exerCnt.html('正在加载中……');
    _topicService.exerciseIndex('',function (res) {
      console.log(res);
      listHtml = _util.renderHtml(templateIndex,{
        list : res
      });
      $exerCnt.html(listHtml);
    }),function (err) {
      console.log(err);
    }
  },
  bindEvent: function () {
    var _this = this;
    $('.exer-cnt').bind('tap','.j-inner-div',function () {
      $(this).siblings('.inner-list').toggleClass('active animated slideInUp')
    });
  },
  //进入做题详情页
  getDetailEvent: function (_this) {
    var _$this  = $(_this),
        dataList = {
          num   : _$this.data('num'),//小节号
          tpId   : _$this.parent().parent().data('tpId'),//试卷id
          major : $('.exer-list .active').data('major')//科目分类
        };
    _topicService.exerciseDetail(dataList,function (res) {
      console.log(res);
      window.location.href = './mockDetails.html';
    },function (err) {
      console.log(err);
    })
  }
};
$(function () {
  _exer.init();
})

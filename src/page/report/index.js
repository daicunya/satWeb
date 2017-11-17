/**
 * Created by daicunya on 2017/10/17.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');

var _util             = require('util/util.js');
var _topicService     = require('service/topic-service.js');
var templateReport    = require('./index.string');

var _report = {
  data: {
    w    : window.outerWidth,
    type : _util.getUrlParam('type') || '',
    id   : _util.getUrlParam('id') || ''
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    var _this = this,
        type = this.data.type;
    if (type == 'exercise') {
      _this.exerciseReport();
    } else if (type == 'mock') {
      _this.mockReportEvent();
    } else {
      _this.evalReportEvent();
    }
  },
  bindEvent: function () {
    var width = this.data.w;
    //模考题目详情左右滑动事件
    $('.report').bind('swipeLeft','.report-list',function(){
      var length  = $('.report-list').length;
      var i = $(this).index();
      if (i+1 == length) {
        return false;
      } else {
        $('.report-mock-wrap').css({
          'margin-left' : -(i+1)*width
        })
      }
    });
    $('.report').bind('swipeRight','.report-list',function(){
      var i = $(this).index();
      if (i == 0) {
        return false;
      } else {
        $('.report-mock-wrap').css({
          'margin-left' : -(i-1)*width
        })
      }
    });
    //进入题目详情
    $('.report').bind('tap','.report-item',function () {
      var qid = $(this).data('qid'),
          major = $('#j-report-major').data('major');
      window.location.href='./readdetails.html?type=exercise&major='+major+'&qid='+qid;
    })
  },
  //练习报告
  exerciseReport: function () {
    var rendHtml = '',
        _this    = this;
    _topicService.exerciseResult('',function (res) {
      rendHtml = _util.renderHtml(templateReport,{
        dataList  : res
      });
      $('.report').html(rendHtml);
      $('.report-go-list').attr('href','./exercise.html');
      _this.changeImg(res.correctRate);
    },function (err) {
      console.log(err);
    })
  },
  //模考报告
  mockReportEvent: function () {
    var rendHtml = '',
        _this    = this;
    _topicService.mockReport(_this.data.id,function (res) {
      rendHtml = _util.renderHtml(templateReport,{
        dataList  : res
      });
      $('.report').html(rendHtml);
      $('.report-go-list').attr('href','./mock.html');
      $('.report-list').css('width',_this.data.w);
      var l = $('.report-list').length;
      $('.report-mock-wrap').css('width',l*100+'%');
      _this.timeEvent(res.res.time);
      _this.changeImg(res.que.correctRate);
    },function (err) {
      console.log(err);
    })
  },
  //测评报告
  evalReportEvent : function () {
    var rendHtml = '',
        _this    = this,
        id = _util.getUrlParam('id');
    _topicService.evalReport(id,function (res) {
      rendHtml = _util.renderHtml(templateReport,{
        dataList  : res
      });
      $('.report').html(rendHtml);
      $('.report-go-list').attr('href','./evaluation.html');
      $('.report-list').css('width',_this.data.w);
      var l = $('.report-list').length;
      $('.report-mock-wrap').css('width',l*100+'%');
      _this.timeEvent(res.report.time);
      _this.changeImg(res.que.correctRate);
    },function (err) {
      console.log(err);
    })
  },
  timeEvent     : function (time) {
    var m = Math.floor(time/60),
        s = Math.floor(time%60);
    m = this.checkTime(m);
    s = this.checkTime(s);
    $('.report-time span').html(m+":"+s);
  },
  checkTime     : function (i) {
    return i<10? '0'+i : i;
  },
  changeImg     : function (num) {
    if ((0 < num) && (num < 60)) {
        $('.report-img img').attr('src','../../../images/report01.png')
    } else if ((60 <= num)&&(num < 80)){
        $('.report-img img').attr('src','../../../images/report02.png')
    }else {
        $('.report-img img').attr('src','../../../images/report03.png')
    }
  }
};
$(function () {
  _report.init();
})
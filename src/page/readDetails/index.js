/**
 * Created by daicunya on 28/09/2017.
 */
'use strict';

require('./index.styl');

var _util             = require('util/util.js');
var _topicService     = require('service/topic-service.js');
var templateIndex     = require('./index.string');
var templateQuestion  = require('./question.string');

var _mockDetail = {
  data : {
    type : _util.getUrlParam('type') || '',
    listParam : {
      major : _util.getUrlParam('major') || '',
      num : _util.getUrlParam('num') || '',
      tpId : _util.getUrlParam('tpId') || ''
    },
    mockParam : {
      tpId : _util.getUrlParam('tpId') || '',
      major : _util.getUrlParam('major') || ''
    }
  },
  init              : function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad            : function () {
    if (this.data.type == 'exercise') {
      this.exerDetailsEvent();
    } else if (this.data.type == 'mock') {
      this.mockDetailsEvent();
    } else {

    }
  },
  bindEvent         : function () {
    var _this = this,
        type  = this.data.type;
    this.selectEvent();
    this.progressEvent();
    this.mathGapEvent();
    $('.read-ul').bind('tap','.read-next',function () {
      if (type == 'exercise') {
        _this.exerNextEvent('next');
      } else if (type == 'mock') {
        _this.mockNextEvent();
      }
    });
    $('.read-ul').bind('tap','.read-prev',function () {
      if (type == 'exercise') {
        _this.exerNextEvent('up');
      }
    });
    $('section').swipeLeft(function () {
      if (type == 'exercise') {
        _this.exerNextEvent('next');
      } else if (type == 'mock') {
        _this.mockNextEvent('next');
      }
    });
    $('section').swipeRight(function () {
      if (($('.read-prev').length) && (type=='exercise')) {
        _this.exerNextEvent('up');
      }
    });
  },
  //选择选项事件
  selectEvent       : function () {
    $('.read-ul').bind('tap','.read-li',function () {
      $('.read-select').removeClass('active');
      $(this).children('.read-select').addClass('active');
    });
  },
  //数学填空事件
  mathGapEvent      : function () {
    var val = [],
        _this = this;
    $('.read-ul').bind('tap','.math-gap input',function () {
      $('.p-shade').addClass('active animated fadeIn');
      $('.math-panel').addClass('active animated slideInUp');
    });
    $('.p-shade').tap(function () {
      _this.mathHiddenEvent();
    });
    $('.read-ul').bind('tap','.math-panel .math-btn',function () {
      val.push($(this).html());
      $('.math-value').html(val);
    });
    $('.read-ul').bind('tap','.math-del',function () {
      val = [];
      $('.math-value').html('');
    });
    $('.read-ul').bind('tap','.math-sure',function () {
      _this.mathHiddenEvent();
    })
  },
  //隐藏数学填空面板
  mathHiddenEvent   : function () {
    $('.math-gap input').val($('.math-value').html());
    $('.p-shade').removeClass('active animated fadeIn');
    $('.math-panel').removeClass('active animated slideInUp');
  },
  //查看解析事件
  progressEvent     : function () {
    $('.read-ul').bind('tap','.read-check',function () {
     $(this).toggleClass('active');
      $('.read-analytic').toggleClass('active');
    })
  },
  //获取练习详情页第一题
  exerDetailsEvent  : function () {
    var _this     = this,
        readHtml  = '',
        listParam = this.data.listParam,
        _$readUl  = $('.read-ul');
    _topicService.exerciseDetail(listParam,function (res) {
      console.log(res);
      readHtml = _util.renderHtml(templateIndex,{
        dataList : res
      });
      _$readUl.html(readHtml);
      _this.lineEvent(res);
      _this.showTag(res);
    },function (err) {
      console.log(err);
    })
  },
  //加载行号
  lineEvent         : function (res) {
    var lineNum = $('.read-cnt').html().split('</p>').length,
        line    = '';
    if (res.data.major == 'Reading') {
      for (var j=1;j<=lineNum;j++){
        if (j%5 == 0){
          line += '<p>'+j+'</p>';
        } else {
          line += '<br>'
        }
      }
      $('.read-line').html(line);
    }
  },
  //默认显示原文或题目
  showTag           : function (res) {
    $('.read-list>li').removeClass('active');
    if (res.data.essay) {
      $('.read-list>li').eq(0).addClass('active');
    } else {
      $('.read-list>li').eq(1).addClass('active');
    }
    if (!$('.p-tag-list>li').eq(0).attr('class')) {
      $('.p-tag-cnt>li').hide();
      $('.p-tag-cnt>li').eq(1).show();
    }
  },
  //练习上下一题
  exerNextEvent     : function (flag) {
    var _this     = this,
        readHtml  = '',
        _$readUl  = $('.read-ul'),
        _$readti  = $('.read-ti');
    //获取答案
    if ($('.math-gap').length) {
      var ans = $('.math-gap input').val();
    } else {
      var ans = $('.select-wrap li .active').parent().attr('data-ans');
    }
    var listParam = {
      answer : ans,
      time   : '12',
      qid    : $('.read-question').data('qid'),
      pos    : flag
    };
    _topicService.nextDetails(listParam,function (res) {
      console.log(res);
      var major = _this.data.listParam.major;
      if ((major == 'Math1') || (major == 'Math2')){
        if (res.data.essay) {
          readHtml = _util.renderHtml(templateIndex,{
            dataList : res
          });
          _$readUl.html(readHtml);
        } else {
          readHtml = _util.renderHtml(templateQuestion,{
            dataList : res
          });
          _$readti.html(readHtml);
        }
      } else {
        readHtml = _util.renderHtml(templateQuestion,{
          dataList : res
        });
        _$readti.html(readHtml);
      }
      _this.showTag(res);
    })
  },
  //获取模考详情页第一题
  mockDetailsEvent  : function () {
    var _this     = this,
        readHtml  = '',
        mockParam = this.data.mockParam,
        _$readUl  = $('.read-ul');
    _topicService.mockDetails(mockParam,function (res) {
      console.log(res);
      readHtml = _util.renderHtml(templateIndex,{
        dataList : res
      });
      _$readUl.html(readHtml);
      _this.lineEvent(res);
      _this.showTag(res);
    },function (err) {
      console.log(err);
    })
  },
  //模考上下一题
  mockNextEvent     : function () {
    var _this    = this,
        readHtml = '',
        _$readUl = $('.read-ul'),
        _$readti = $('.read-ti'),
        major    = $('#j-major').data('major');
    //获取答案
    if ($('.math-gap').length) {
      var ans = $('.math-gap input').val();
    } else {
      var ans = $('.select-wrap li .active').parent().attr('data-ans');
    }
    var listParam = {
      answer  : ans,
      utime   : '12',
      qid     : $('.read-question').data('qid'),
      tpId     : $('#j-tpId').data('tpid'),
      section : $('#j-section').data('sec'),
      number  : $('.read-question').data('num')
    };
    //下一小节
    if (!$('#j-nextId').data('next')) {
      listParam.section = $('#j-nextSection').data('next');
      listParam.number  = 0;
    } else {
      listParam.section = $('#j-section').data('sec');
    }
    //上下一题接口
    _topicService.mockNext(listParam, function (res) {
      console.log(res);
      if ((major == 'Math1') || (major == 'Math2')) {
        if (res.data.essay) {
          readHtml = _util.renderHtml(templateIndex, {
            dataList: res
          });
          _$readUl.html(readHtml);
        } else {
          readHtml = _util.renderHtml(templateQuestion, {
            dataList: res
          });
          _$readti.html(readHtml);
        }
      } else {
        if ($('#j-id').data('id') != res.data.id) {
          readHtml = _util.renderHtml(templateIndex, {
            dataList: res
          });
          _$readUl.html(readHtml);
          _this.lineEvent(res);
        } else {
          readHtml = _util.renderHtml(templateQuestion, {
            dataList: res
          });
          _$readti.html(readHtml);
        }
      }
      _this.showTag(res);
    })
  }
};
$(function () {
  _mockDetail.init();
});
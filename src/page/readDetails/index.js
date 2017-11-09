/**
 * Created by daicunya on 28/09/2017.
 */
'use strict';

require('./index.styl');

var _util             = require('util/util.js');
var _topicService     = require('service/topic-service.js');
var templateIndex     = require('./index.string');
var templateQuestion  = require('./question.string');

var ALLTIME    = '',
    SINGLETIME = '',
    COUNTTIME  = '',
    RELAXTIME  = '';

var _mockDetail = {
  data : {
    type : _util.getUrlParam('type') || '',
    qid  : _util.getUrlParam('qid')  || '',//个人中心、报告进入的会有qid
    width : $('html').width(),
    listParam : {
      major : _util.getUrlParam('major') || '',
      num : _util.getUrlParam('num') || '',
      tpId : _util.getUrlParam('tpId') || ''
    },
    //模考数据
    mockParam : {
      tpId : _util.getUrlParam('tpId') || '',
      major : _util.getUrlParam('major') || ''
    },
    //测评数据
    evalParam  : {
      tpId  : _util.getUrlParam('tpId') || ''
    }
  },
  init              : function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad            : function () {
    var type = this.data.type;
    if (this.data.qid) {
      this.exerDetailsEvent();
    } else {
      if (type == 'exercise') {
        this.exerDetailsEvent();
      } else if (type == 'mock') {
        this.mockDetailsEvent();
      } else if (type == 'evaluation'){
        this.evalDetailsEvent();
      }
    }
  },
  bindEvent         : function () {
    var _this = this,
        type  = this.data.type;
    this.selectEvent();//选择题选项
    this.progressEvent();//查看答案详情
    this.mathGapEvent();//数学填空事件
    //下一题
    $('.read-ul').bind('tap','.read-next',function () {
      if (type == 'exercise') {
        _this.exerNextEvent('next');
      } else if (type == 'mock') {
        _this.mockNextEvent();
      } else if(type == 'evaluation'){
        _this.evalNext('next');
      }
    });
    //上一题
    $('.read-ul').bind('tap','.read-prev',function () {
      if (type == 'exercise') {
        _this.exerNextEvent('up');
      }
    });
    //向左滑动下一题
    $('section').swipeLeft(function () {
      var bl = $('.read-next').css('display')
      if ((type == 'exercise') && (bl == 'block')) {
        _this.exerNextEvent('next');
      } else if ((type == 'mock') && (bl == 'block')) {
        _this.mockNextEvent('next');
      } else if ((type == 'evaluation') && (bl == 'block')){
        _this.evalNext('next');
      }
    });
    //向右滑动上一题
    $('section').swipeRight(function () {
      if (($('.read-prev').length) && (type=='exercise')) {
        _this.exerNextEvent('up');
      }
    });
    //提交事件
    $('.read-ul').bind('tap','.read-submit',function () {
      if (_this.data.type == 'exercise') {
        _this.submitDetails('next');//练习提交
      } else if (_this.data.type == 'mock') {
        _this.mockSubmitEvent();//模考提交
      } else {
        _this.evalSubmitEvent();//测评提交
      }
    });
    //弹窗继续事件
    $('.read-ul').bind('tap','.read-win-continue',function () {
      $('.read-window').hide();
      $('.read-window>div').hide();
    });
    //退出弹框
    $('.read-ul').bind('tap','.read-out',function () {
      $('.read-window').show();
      $('.read-win-out').show();
    });
    //确认退出事件
    $('.read-ul').bind('tap','.read-get-out',function () {
      _topicService.getOut(function (res) {
        if (_this.data.type == 'mock') {
          window.location.href='./mock.html';
        } else if (_this.data.type = 'exercise') {
          window.location.href='./exercise.html';
        }
      },function (err) {
        console.log(err)
      })
    });
    //收藏事件
    $('.read-ul').on('tap','.read-progress i',function () {
      var _this = this,
          data = {
              qid : $('.read-question').data('qid'),
              flag : 0
          };
      if ($(this).hasClass('fa-star-o')) {
        _topicService.collection(data,function (res) {
          $(_this).removeClass('fa-star-o').addClass('fa-star active').html('已收藏');
        })
      } else {
        data.flag = 1;
        _topicService.collection(data,function (res) {
          $(_this).removeClass('fa-star active').addClass('fa-star-o').html('收藏');
        })
      }
    })
  },
  //做题计时(单题)
  timeEvent         : function (tp,st) {
    var _this = this,
        t = 0;
    if (tp == 'exercise') {
      $('.read-time span').html('00:00');
    }
    clearInterval(SINGLETIME);
    SINGLETIME = setInterval(function () {
      t++;
      sessionStorage.time = t;
      var m = Math.floor(t/60),
          s = Math.floor(t%60);
      m = _this.checkTimeEvent(m);
      s = _this.checkTimeEvent(s);
      if (_this.data.type == 'exercise') {
        $('.read-time span').html(m+":"+s);
      }
    },1000);
    if (st == 'stop') {
      clearInterval(SINGLETIME);
    }
  },
  //模考总做题时间
  totalTime         : function () {
    var i = 0;
    clearInterval(ALLTIME);
    ALLTIME = setInterval(function () {
      i++;
      sessionStorage.setItem('alltime',i);
    },1000);
  },
  //section倒计时(section,休息时间倒计时)
  countTimeEvent    : function (t) {
    var _this = this;
    clearInterval(COUNTTIME);
    COUNTTIME = setInterval(function () {
      t--;
      var m = Math.floor(t/60),
          s = Math.floor(t%60),
          h = parseInt(m/60);
      m = m%60;
      h = _this.checkTimeEvent(h);
      m = _this.checkTimeEvent(m);
      s = _this.checkTimeEvent(s);
      //模考小结倒计时
      if (t==0) {
        clearInterval(COUNTTIME);
        alert('去哪了,回来做题');
      }
      $('.read-time span').html(h+':'+m+':'+s);
      sessionStorage.setItem('countTime',t);
    },1000);
  },
  //休息事件
  relaxTimeEvent    : function (t) {
    var _this = this;
    clearInterval(RELAXTIME);
    RELAXTIME = setInterval(function () {
      t--;
      var m = Math.floor(t/60),
          s = Math.floor(t%60);
      m = _this.checkTimeEvent(m);
      s = _this.checkTimeEvent(s);
      if(t == 0) {
        clearInterval(RELAXTIME);
        $('.read-window').hide();
      }
      $('.read-win-time span').html(m+":"+s);
    },1000);
  },
  checkTimeEvent    : function (i) {
    return i<10? '0'+i : i;
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
      if (_this.data.type != 'evaluation') {
        $('.p-shade').addClass('active animated fadeIn');
        $('.math-panel').addClass('active animated slideInUp');
      }
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
      val = [];
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
    $('.read-ul').on('tap','.read-check',function () {
      $(this).show().toggleClass('active');
      $('.read-analytic').toggleClass('active');
    })
  },
  //获取练习详情页第一题
  exerDetailsEvent  : function () {
    var _this     = this,
        readHtml  = '',
        qid       = this.data.qid,
        _$readUl  = $('.read-ul');
    var listParam  =this.data.listParam;
    qid ? (listParam.qid = qid) : listParam;
    _topicService.exerciseDetail(listParam,function (res) {
      console.log(res);
      readHtml = _util.renderHtml(templateIndex,{
        dataList : res
      });
      _$readUl.html(readHtml);
      _this.lineEvent(res);//添加行号
      _this.showTag(res);//默认显示原文或题目
      _this.timeEvent('exercise');
      //图片添加域名
      var num1 = $('.read-original img').length,
          num2 = $('.read-ti .read-question img').length,
          arr1 = [],
          arr2 = [];
      for (var i=0;i<num1;i++) {
        arr1.push($('.read-original img').eq(i).attr('src'));
        $('.read-original img').eq(i).attr('src',"http://www.thinkusat.com"+arr1[i]);
      }
      for (var i=0;i<num2;i++) {
        arr2.push($('.read-ti .read-question img').eq(i).attr('src'));
        $('.read-ti .read-question img').eq(i).attr('src',"http://www.thinkusat.com"+arr2[i]);
        console.log($('.read-ti .read-question img').eq(i).width());
        if ($('.read-ti .read-question img').eq(i).width() >= _this.data.width) {
          $('.read-ti .read-question img').eq(i).width('90%');
        }
      }
      //做过的题目直接显示答案
      if (res.userans) {
        if (res.userans == 'A') {
          $('.read-li').eq(0).children('.read-select').addClass('active');
        } else if (res.userans == 'B'){
          $('.read-li').eq(1).children('.read-select').addClass('active');
        } else if (res.userans == 'C') {
          $('.read-li').eq(2).children('.read-select').addClass('active');
        } else if (res.userans == 'D') {
          $('.read-li').eq(3).children('.read-select').addClass('active');
        } else {
          $('.math-gap input').val(res.userans);
        }
      }

      if (qid) {
        $('.read-ul .read-check').show();
      } else {
        $('.read-ul .read-check').hide();
        $('.read-analytic').hide();
      }
      if (res.collection == 1) {
        $('.read-ul .read-progress i').removeClass('fa-star-o').addClass('fa-star active').html('已收藏')
      }
    },function (err) {
      console.log(err);
    })
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
    //向后台传的数据
    var listParam = {
      answer    : ans,
      userTime  : sessionStorage.time,//每道题的时间
      qid       : $('.read-question').data('qid'),
      pos       : flag
    };
    _topicService.nextDetails(listParam,function (res) {
      var major = _this.data.listParam.major;
      if ((major == 'Math1') || (major == 'Math2')){
        if (res.data.essay) {
          readHtml = _util.renderHtml(templateIndex,{
            dataList : res
          });
          _$readUl.html(readHtml);
          _this.showTag(res);
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
      //图片添加域名
      var num1 = $('.read-original img').length,
          num2 = $('.read-ti .read-question img').length,
          arr1 = [],
          arr2 = [];
      for (var i=0;i<num1;i++) {
        arr1.push($('.read-original img').eq(i).attr('src'));
        $('.read-original img').eq(i).attr('src',"http://www.thinkusat.com"+arr1[i]);
      }
      for (var i=0;i<num2;i++) {
        arr2.push($('.read-ti .read-question img').eq(i).attr('src'));
        $('.read-ti .read-question img').eq(i).attr('src',"http://www.thinkusat.com"+arr2[i]);
        console.log($('.read-ti .read-question img').eq(i).width());
        if ($('.read-ti .read-question img').eq(i).width() >= _this.data.width) {
          $('.read-ti .read-question img').eq(i).width('90%');
        }
      }
      //做过的题目不再重新计时
      if (!res.userTime) {
        _this.timeEvent('exercise');
      } else {
        var t = res.userTime;
        _this.timeEvent('exercise','stop');
        var m = Math.floor(t/60),
            s = Math.floor(t%60);
        m = _this.checkTimeEvent(m);
        s = _this.checkTimeEvent(s);
        $('.read-time span').html(m+":"+s);
        sessionStorage.time = t;
      }
      if (!res.nextId) {
        if (_this.data.qid) {
          $('.read-next').hide();
        } else {
          $('.read-next').hide();
          $('.read-submit').show();
        }
      }
      //做过的题目直接显示答案
      if (res.userans) {
        if (res.userans == 'A') {
          $('.read-li').eq(0).children('.read-select').addClass('active');
        } else if (res.userans == 'B'){
          $('.read-li').eq(1).children('.read-select').addClass('active');
        } else if (res.userans == 'C') {
          $('.read-li').eq(2).children('.read-select').addClass('active');
        } else if (res.userans == 'D') {
          $('.read-li').eq(3).children('.read-select').addClass('active');
        } else {
          $('.math-gap input').val(res.userans);
        }
      }
      //题目详情显示答案与解析
      if (_this.data.qid) {
        $('.read-ul .read-check').show();
      } else {
        $('.read-ul .read-check').hide();
        $('.read-analytic').hide();
      }
      //判断是否有收藏
      if (res.collection == 1) {
        $('.read-ul .read-progress i').removeClass('fa-star-o').addClass('fa-star active').html('已收藏')
      }
    })
  },
  //练习提交事件
  submitDetails     : function (flag) {
    //获取答案
    if ($('.math-gap').length) {
      var ans = $('.math-gap input').val();
    } else {
      var ans = $('.select-wrap li .active').parent().attr('data-ans');
    }
    var listParam = {
      answer    : ans,
      userTime  : sessionStorage.time,//每道题的时间
      qid       : $('.read-question').data('qid'),
      pos       : flag
    };
    _topicService.nextDetails(listParam,function (res){});
    window.location.href = './report.html?type=exercise';
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
    //read-list  文法
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
  //获取模考详情页第一题
  mockDetailsEvent  : function () {
    var _this     = this,
        readHtml  = '',
        mockParam = this.data.mockParam,
        _$readUl  = $('.read-ul');
    _topicService.mockDetails(mockParam,function (res) {
      readHtml = _util.renderHtml(templateIndex,{
        dataList : res
      });
      _$readUl.html(readHtml);
      _this.lineEvent(res);//加载行号
      _this.showTag(res);
      _this.timeEvent('mock');//每个题目做题时间
      _this.totalTime();//模考总做题时间
      _this.countTimeEvent(res.sectionTime*60);//每个小结倒计时
      $('.read-ul .read-check').hide();
      $('.read-analytic').hide();
      $('.read-ul .read-progress i').hide();
    },function (err) {
      console.log(err);
    });
  },
  //模考下一题
  mockNextEvent     : function () {
    var _this    = this,
        readHtml = '',
        _$readUl = $('.read-ul'),
        _$readti = $('.read-ti'),
        major    = $('#j-major').data('major'),
        countTime= sessionStorage.getItem('countTime');//小结倒计时时间
    //获取答案
    if ($('.math-gap').length) {
      var ans = $('.math-gap input').val();
    } else {
      var ans = $('.select-wrap li .active').parent().attr('data-ans');
    }
    var listParam = {
      answer    : ans,
      userTime  : sessionStorage.time,
      qid       : $('.read-question').data('qid'),
      tpId      : $('#j-tpId').data('tpid'),
      section   : $('#j-section').data('sec'),
      number    : $('.read-question').data('num'),
      major     : _this.data.mockParam.major
    };
    _this.data.listParam.major ? '' : (delete listParam.major);
    //判断是否进入下一小节
    if (!$('#j-nextId').data('next')) {
      listParam.section = $('#j-nextSection').data('next');
      listParam.number  = 0;
    } else {
      listParam.section = $('#j-section').data('sec');
    }
    //模考下一题接口
    _topicService.mockNext(listParam, function (res) {
      if ((major == 'Math1') || (major == 'Math2')) {
        if (res.data.essay) {
          readHtml = _util.renderHtml(templateIndex, {
            dataList: res
          });
          _$readUl.html(readHtml);
          _this.showTag(res);
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
          _this.showTag(res);
        } else {
          readHtml = _util.renderHtml(templateQuestion, {
            dataList: res
          });
          _$readti.html(readHtml);
        }
      }
      $('.read-ul .read-check').hide();
      $('.read-analytic').hide();
      $('.read-ul .read-progress i').hide();
      //图片添加域名
      var num1 = $('.read-original img').length,
          num2 = $('.read-ti .read-question img').length,
          arr1 = [],
          arr2 = [];
      for (var i=0;i<num1;i++) {
        arr1.push($('.read-original img').eq(i).attr('src'));
        $('.read-original img').eq(i).attr('src',"http://www.thinkusat.com"+arr1[i]);
      }
      for (var i=0;i<num2;i++) {
        arr2.push($('.read-ti .read-question img').eq(i).attr('src'));
        $('.read-ti .read-question img').eq(i).attr('src',"http://www.thinkusat.com"+arr2[i]);
        if ($('.read-ti .read-question img').eq(i).width() >= _this.data.width) {
          $('.read-ti .read-question img').eq(i).width('90%');
        }
      }
      //判断显示下一题还是提交
      if ((!res.nextId)&&(!res.nextSection)) {
        $('.read-next').hide();
        $('.read-submit').show();
      }
      if (res.data.number == 1) {
        //5分钟休息
        if (res.nextSection == '3' || res.nextSection == '') {
          $('.read-window').show();
          $('.read-win-wrap').show();
          _this.relaxTimeEvent(300);
        }
        _this.countTimeEvent(res.sectionTime*60);//每个小结倒计时
      }
    });
    _this.timeEvent('exercise');//每个题目做题时间
  },
  //模考提交事件
  mockSubmitEvent   : function () {
    var _this = this;
    //获取答案
    if ($('.math-gap').length) {
      var ans = $('.math-gap input').val();
    } else {
      var ans = $('.select-wrap li .active').parent().attr('data-ans');
    }
    var listParam = {
      answer    : ans,
      userTime  : sessionStorage.time,
      qid       : $('.read-question').data('qid'),
      tpId      : $('#j-tpId').data('tpid'),
      section   : $('#j-section').data('sec'),
      number    : $('.read-question').data('num'),
      major     : _this.data.mockParam.major,
      time      : sessionStorage.alltime //总的做题时间
    };
    _this.data.listParam.major ? '' : (delete listParam.major);
    _topicService.mockNext(listParam, function (res) {});
    window.location.href = './report.html?type=mock';
  },
  //测评详情第一题
  evalDetailsEvent  : function () {
    var _this     = this,
        rendHtml  = '',
        listParam = this.data.evalParam;
    _topicService.evalTest(listParam,function (res) {
      console.log(res);
      rendHtml = _util.renderHtml(templateIndex,{
        dataList : res
      });
      $('.read-ul').html(rendHtml);
      _this.showTag(res);
      $('.read-ul .read-check').hide();
      $('.read-ul .read-progress i').hide();//收藏隐藏
      $('.read-analytic').hide();
      _this.timeEvent('mock');//每个题目做题时间
      _this.totalTime();//模考总做题时间
      _this.countTimeEvent(120*60);//每个小结倒计时
    },function (err) {
      console.log(err);
    })
  },
  //测评下一题
  evalNext          : function () {
    var _this    = this,
        rendHtml = '',
        _$readUl = $('.read-ul'),
        _$readti = $('.read-ti'),
        countTime= sessionStorage.getItem('countTime');//小结倒计时时间
    //获取答案
    if ($('.math-gap').length) {
      var ans = $('.math-gap input').val();
    } else {
      var ans = $('.select-wrap li .active').parent().attr('data-ans');
    }
    var listParam = {
      answer    : ans,
      userTime  : sessionStorage.time,
      qid       : $('.read-question').data('qid'),
      tpId      : $('#j-tpId').data('tpid'),
      section   : $('#j-section').data('sec'),
      number    : $('.read-question').data('num')
    };
    //判断是否进入下一小节
    if (!$('#j-nextId').data('next')) {
      listParam.section = $('#j-nextSection').data('next');
      listParam.number  = 0;
    } else {
      listParam.section = $('#j-section').data('sec');
    }
    //测评下一题接口
    _topicService.evalNext(listParam, function (res) {
      rendHtml = _util.renderHtml(templateIndex,{
        dataList : res
      });
      $('.read-ul').html(rendHtml);
      _this.showTag(res);
      $('.read-ul .read-check').hide();
      $('.read-ul .read-progress i').hide();//收藏隐藏
      $('.read-analytic').hide();
      if (res.data.major == "Translation") {
        $('.math-gap').hide();
        $('.textarea-gap').show();
      }
      //图片添加域名
      var num1 = $('.read-original img').length,
          num2 = $('.read-ti .read-question img').length,
          arr1 = [],
          arr2 = [];
      for (var i=0;i<num1;i++) {
        arr1.push($('.read-original img').eq(i).attr('src'));
        $('.read-original img').eq(i).attr('src',"http://www.thinkusat.com"+arr1[i]);
      }
      for (var i=0;i<num2;i++) {
        arr2.push($('.read-ti .read-question img').eq(i).attr('src'));
        $('.read-ti .read-question img').eq(i).attr('src',"http://www.thinkusat.com"+arr2[i]);
        if ($('.read-ti .read-question img').eq(i).width() >= _this.data.width) {
          $('.read-ti .read-question img').eq(i).width('90%');
        }
      }
      //判断显示下一题还是提交
      if ((!res.nextId)&&(!res.nextSection)) {
        $('.read-next').hide();
        $('.read-submit').show();
      }
      _this.countTimeEvent(countTime);
    },function (err) {
      console.log(err);
    });
    _this.timeEvent('exercise');//每个题目做题时间
  },
  //测评提交事件
  evalSubmitEvent   : function () {
    var _this = this;
    //获取答案
    if ($('.math-gap').length) {
      var ans = $('.math-gap input').val();
    } else {
      var ans = $('.select-wrap li .active').parent().attr('data-ans');
    }
    var listParam = {
      answer    : ans,
      userTime  : sessionStorage.time,
      qid       : $('.read-question').data('qid'),
      tpId      : $('#j-tpId').data('tpid'),
      section   : $('#j-section').data('sec'),
      number    : $('.read-question').data('num'),
      time      : sessionStorage.getItem('alltime')
    };
    _topicService.evalNext(listParam, function (res) {

    });
    window.location.href = './report.html?type=evaluation';
  }
};
$(function () {
  _mockDetail.init();
});
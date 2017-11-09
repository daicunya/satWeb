/**
 * Created by daicunya on 2017/10/26.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _util            = require('util/util.js');
var _delete          = require('../common/js/touchDelete.js');
var _userService     = require('service/user-service.js');
var templateExercise = require('./index.string');
var templateMore     = require('./more.string');

var _userExercise = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad : function () {
    this.loadTemp();
  },
  bindEvent: function () {
    var _this = this;
    //删除报告
    $('.user-wrap').on('tap','.user-delete',function () {
      var id = $(this).data('id');
      _userService.delTopic(id,function (res) {
        _this.loadTemp();
      });
    });
    //查看报告
    $('.user-wrap').on('tap','.user-report',function () {
      var id = $(this).data('id'),
          major = $('.user-nav .active').data('major');
      if (major == 'Reading') {
        window.location.href = './readdetails.html?type=exercise&major=Reading&qid='+id;
      } else if (major == 'Writing') {
        window.location.href = './readdetails.html?type=exercise&major=Writing&qid='+id;
      } else if (major == 'Math') {
        window.location.href = './readdetails.html?type=exercise&major=Math&qid='+id;
      }
    });
    //加载更多数据
    $('.user-wrap').on('tap','.p-info-more',function () {
      var $this = $(this);
      _this.moreHtml($this);
    })
  },
  loadTemp : function () {
    var rendHtml = '';
    _userService.userExercise('',function (res) {
      console.log(res);
      rendHtml = _util.renderHtml(templateExercise,{
        dataList : res
      });
      $('.user-wrap').html(rendHtml);
    });
  },
  moreHtml : function ($this) {
    var data = {
          p : Number($this.data('p')+1),
          major : $('.user-nav .active').data('major')
        },
        result = '',
        all = Number($this.data('all'));
    if (data.p <= all) {
      $.ajax({
        url : _util.getServerUrl('/cn/wap-api/person-exercise'),
        type : 'post',
        data : data,
        dataType : 'json',
        beforeSend : function (xhr) {
          xhr.withCredentials = true;
          $this.html('加载中……');
        },
        success : function (res) {
          var res = res.data;
          console.log(res);
          result =  _util.renderHtml(templateMore,{
            dataCnt : res
          });
          if (data.major == 'Reading') {
            $('.user-wrap .user-list').eq(0).children('dl').append(result);
          } else if(data.major == 'Writing') {
            $('.user-wrap .user-list').eq(1).children('dl').append(result);
          } else if (data.major == 'Math') {
            $('.user-wrap .user-list').eq(2).children('dl').append(result);
          }
          $this.data('p',Number(res.dataCurrent)).html('浏览更多');
        }
      });
    } else {
      $this.hide().siblings('.p-info-bottom').show();
    }
  }
};
$(function () {
  _userExercise.init();
  _delete.touch('user-wrap','user-item');
})
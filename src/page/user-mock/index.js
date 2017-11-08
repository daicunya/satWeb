/**
 * Created by daicunya on 2017/10/26.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _util = require('util/util.js');
var _delete = require('../common/js/touchDelete.js');
var _userService = require('service/user-service.js');
var templateMock = require('./index.string');
var templateAllMock = require('./allMock.string');
var templateSingleMock = require('./singleMock.string');

var _userMock = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad : function () {
    this.loadTemp();
  },
  bindEvent: function () {
    var rendHtml = '',
        _this = this;
    //删除报告
    $('.user-wrap').on('tap','.user-delete',function () {
      var id = $(this).data('id');
      _userService.delReport(id,function (res) {
        _this.loadTemp();
      });
    });
    //查看报告
    $('.user-wrap').on('tap','.user-report',function () {
      var id = $(this).data('id');
      window.location.href = './report.html?type=mock&id='+id;
    });
    //加载更多数据
    $('.user-wrap').on('tap','.p-info-more',function () {
      var $this = $(this);
      _this.moreHtml($this);
    })
  },
  loadTemp : function () {
    var rendHtml = '';
    _userService.userMock('',function (res) {
      console.log(res);
      rendHtml = _util.renderHtml(templateMock,{
        dataList : res
      });
      $('.user-wrap').html(rendHtml);
    });
  },
  moreHtml : function ($this) {
    var data = {
          p     : Number($this.data('p')+1),
          major : $('.user-nav .active').data('major')
        },
        result = '',
        all = Number($this.data('all'));
    if (data.p <= all) {
      $.ajax({
        url : _util.getServerUrl('/cn/wap-api/person-mock'),
        type : 'post',
        data : data,
        dataType : 'json',
        beforeSend : function () {
          $this.html('加载中……');
        },
        success : function (res) {
          var res = res.data;
          console.log(res);
          if (data.major == 'all') {
            result =  _util.renderHtml(templateAllMock,{
              dataCnt : res
            });
            $('.user-wrap .user-list').eq(0).children('dl').append(result);
            $this.data('p',Number(res.data.all.allCurrent)).html('浏览更多');
          } else {
            result =  _util.renderHtml(templateSingleMock,{
              dataCnt : res
            });
            $('.user-wrap .user-list').eq(1).children('dl').append(result);
            $this.data('p',Number(res.data.single.singleCurrent)).html('浏览更多');
          }
        }
      });
    } else {
      $this.hide().siblings('.p-info-bottom').show();
    }
  }
};
$(function () {
  _userMock.init();
 _delete.touch('user-wrap','user-item');
})

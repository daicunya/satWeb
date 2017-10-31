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
  //  查看报告
    $('.user-wrap').on('tap','.user-report',function () {
      var id = $(this).data('id');
      window.location.href = './report.html?type=mock&id='+id;
    });
    //上下翻页
    $('.user-wrap').on('tap','.p-next',function () {
      var listParam = {
        p     : $(this).data('num'),
        major : $('.user-nav .active').data('major')
      };
      _userService.userMock(listParam,function (res) {
        console.log(res);
        if (listParam.major == 'all') {
          $('.user-wrap dl').append("<dd class='user-item'>Hello</dd>")
        }
      })
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
  }
};
$(function () {
  _userMock.init();
 _delete.touch('user-wrap','user-item');
})

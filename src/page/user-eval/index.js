/**
 * Created by daicunya on 2017/10/25.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _util = require('util/util.js');
var _delete      = require('../common/js/touchDelete.js');
var _userService = require('service/user-service.js');
var template     = require('./index.string');
var templateMore = require('./more.string');

var _center = {
  data : {
    p : 1
  },
  init : function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad : function () {
    this.loadTemp();
  },
  bindEvent : function () {
    var _this = this;
    //删除报告
    $('.user-wrap').on('tap','.user-delete',function () {
      var id = $(this).data('id');
      _userService.delEval(id,function (res) {
        _this.loadTemp();
      });
    });
    //查看报告
    $('.user-wrap').on('tap','.user-report',function () {
      var id = $(this).data('id');
      window.location.href = './report.html?type=evaluation&id='+id;
    });
    //加载更多数据
    $('.user-wrap').on('tap','.p-info-more',function () {
      var $this = $(this);
      _this.moreHtml($this);
    })
  },
  loadTemp : function () {
    var rendHtml  = '';
    _userService.userEval('',function (res) {
      console.log(res);
      $.each(res.data.data,function (i,data) {
        data.date = new Date(parseInt(data.date) * 1000).toLocaleString('chinese',{hour12:false}).replace(/[/]/g,'-');
      });
      rendHtml = _util.renderHtml(template,{
        dataList : res
      })
      $('.user-wrap').html(rendHtml);
    })
  },
  moreHtml : function ($this) {
    var p = Number($this.data('p') + 1),
        result = '',
        all = Number($this.data('all'));
    if (p <= all) {
      $.ajax({
        url: _util.getServerUrl('/cn/wap-api/eval'),
        type: 'post',
        data: {
          p: p
        },
        dataType: 'json',
        beforeSend: function () {
          $this.html('加载中……');
        },
        success: function (res) {
          var res = res.data;
          $.each(res.data.data,function (i,data) {
            data.date = new Date(parseInt(data.date) * 1000).toLocaleString('chinese',{hour12:false}).replace(/[/]/g,'-');
          });
          result = _util.renderHtml(templateMore, {
            dataCnt: res
          });
          $('.user-wrap .user-list dl').append(result);
          $this.data('p', Number(res.data.Current)).html('浏览更多');
        }
      })
    } else {
      $this.hide().siblings('.p-info-bottom').show();
    }
  }
};

$(function () {
  _center.init();
  _delete.touch('user-wrap','user-item');
})

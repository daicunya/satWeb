/**
 * Created by daicunya on 2017/10/31.
 */
'use strict';
require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');
var _util = require('util/util.js');
var _utilService = require('service/util-service.js');
var template = require('./index.string');
var templateMore = require('./more.string');

var _pubClass = {
  init : function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad : function () {
    _utilService.pubClass(function (res) {
      var rendHtml = '';
      $.each(res.new,function (i,data) {
        data.publishTime = new Date(parseInt(data.publishTime) * 1000).toLocaleString('chinese',{hour12:false}).replace(/[/]/g,'-');
      });
      $.each(res.history,function (i,data) {
        data.publishTime = new Date(parseInt(data.publishTime) * 1000).toLocaleString('chinese',{hour12:false}).replace(/[/]/g,'-');
      });
      rendHtml = _util.renderHtml(template,{
        dataList : res
      })
      $('.pubClass').html(rendHtml);
    })
  },
  bindEvent : function () {
    var _this = this;
    $('.pubClass').on('tap','.p-info-more',function () {
      var $this = $(this);
      _this.moreHtml($this);
    })
  },
  moreHtml : function ($this) {
    var p = Number($this.data('p')+1),
        all = Number($this.data('all')),
        result = '';
    if (p <= all) {
      $.ajax({
        url :  _util.getServerUrl('/cn/wap-api/pub-class'),
        type :'post',
        data : {
          p: p
        },
        dataType : 'json',
        beforeSend : function () {
          $this.html('加载中……');
        },
        success : function (res) {
          var res = res.data;
          $.each(res.history,function (i,data) {
            data.publishTime = new Date(parseInt(data.publishTime) * 1000).toLocaleString('chinese',{hour12:false}).replace(/[/]/g,'-');
          });
          result = _util.renderHtml(templateMore,{
            dataCnt : res
          })
          $('.pub-history').append(result);
          $this.data('p',Number(res.historyCurrent)).html('浏览更多');
        }
      })
    } else {
      $this.hide().siblings('.p-info-bottom').show();
    }
  }
}
$(function () {
 _pubClass.init();
})
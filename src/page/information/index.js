/**
 * Created by daicunya on 2017/10/30.
 */
'use strict';
require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _util = require('util/util.js');
var _utilService = require('service/util-service.js');
var templateInfo = require('./index.string');
var templateMore = require('./more.string');

var _information = {
  init : function () {
    this.bindEvent();
    this.loadHtml('');
  },
  bindEvent : function () {
    var _this = this;
    //加载更多数据
    $('.info-wrap').on('tap','.p-info-more',function () {
      var $this = $(this);
      _this.moreHtml($this);
    })
  },
  loadHtml : function () {
    var rendHtml = '';
    _utilService.infoIndex('',function (res) {
      //时间戳转成时间格式
      $.each(res,function (i,list) {
        $.each(list.data,function (i,data) {
          data.publishTime = new Date(parseInt(data.publishTime) * 1000).toLocaleString('chinese',{hour12:false}).replace(/[/]/g,'-');
        })
      });
      rendHtml = _util.renderHtml(templateInfo,{
        dataList : res
      });
      $('.info-wrap').html(rendHtml);
    })
  },
  moreHtml : function ($this) {
    var data = {
      p : Number($this.data('p')+1),
      cate : $('.information-list .active').data('value')
    },
        result = '',
        all = Number($this.data('all'));
    if (data.p <= all) {
      $.ajax({
        url : _util.getServerUrl('/cn/wap-api/info'),
        type : 'post',
        data : data,
        dataType : 'json',
        beforeSend : function () {
          $this.html('加载中……');
        },
        success : function (res) {
          var res = res.data;
          $.each(res.data.data,function (i,data) {
            data.publishTime = new Date(parseInt(data.publishTime) * 1000).toLocaleString('chinese',{hour12:false}).replace(/[/]/g,'-');
          });
          result =  _util.renderHtml(templateMore,{
            dataCnt : res
          });
          if (data.cate == 'news') {
            $('.info-wrap .p-info-list').eq(0).children('ul').append(result);
          } else if(data.cate == 'report') {
            $('.info-wrap .p-info-list').eq(1).children('ul').append(result);
          } else if (data.cate == 'experience') {
            $('.info-wrap .p-info-list').eq(2).children('ul').append(result);
          }
          $this.data('p',Number(res.data.Current)).html('浏览更多');
        }
      });
    } else {
      $this.hide().siblings('.p-info-bottom').show();
    }
  }
};

$(function () {
  _information.init();
})
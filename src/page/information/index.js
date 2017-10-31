/**
 * Created by daicunya on 2017/10/30.
 */
'use strict';
require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');
require('../common/js/dropload');

var _util = require('util/util.js');
var _utilService = require('service/util-service.js');
var templateInfo = require('./index.string');

var _info = {
  init : function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad : function () {
    var _this = this,
        rendHtml = '';
    _utilService.infoIndex('',function (res) {
      //时间戳转成时间格式
      $.each(res,function (i,list) {
        $.each(list,function (i,data) {
          data.publishTime = new Date(parseInt(data.publishTime) * 1000).toLocaleString().replace(/[/]/g,'-').substr(0,9);
        })
      });
      rendHtml = _util.renderHtml(templateInfo,{
        dataList : res
      })
      $('.info-wrap').html(rendHtml);
    })
  },
  bindEvent : function () {

  }
};

$(function () {
  _info.init();
})
/**
 * Created by daicunya on 2017/10/30.
 */
'use strict';
require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');
var _util             = require('util/util.js');
var _utilService = require('service/util-service.js');
var templateInfo    = require('./index.string');

var _infoDetails = {
  init : function () {
    this.onLoad();
  },
  onLoad : function () {
    this.loadInfo();
  },
  bindEvent : function () {

  },
  loadInfo : function () {
    var id = _util.getUrlParam('id'),
        rendHtml = '';
    _utilService.infoDetails(id,function (res) {
      console.log(res);
      res.publishTime = new Date(parseInt(res.publishTime)*1000).toLocaleString().replace(/[/]/g,'-')
      rendHtml = _util.renderHtml(templateInfo,{
        dataList : res
      })
      $('.info-wrap').html(rendHtml);
    })
  }
};
$(function () {
  _infoDetails.init();
})
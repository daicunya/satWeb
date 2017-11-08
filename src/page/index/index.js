/**
 * Created by daicunya on 2017/9/17.
 */

'use strict';
require('./index.styl');
require('../common/footer/index.js');
require('page/common/banner/index.js');

var _util = require('util/util.js');
var _utilService = require('service/util-service.js');
var template = require('./index.string');

var _home = {
  init: function () {
    this.onLoad();
  },
  onLoad : function () {
    this.getHtml();
  },
  getHtml : function () {
    var rendHtml = '';
    _utilService.satIndex(function (res) {
      $.each(res.news,function (i,data) {
        data.publishTime = new Date(parseInt(data.publishTime) * 1000).toLocaleString('chinese',{hour12:false}).replace(/[/]/g,'-');
      });
      rendHtml = _util.renderHtml(template,{
        dataList : res
      });
      $('.home-wrap').html(rendHtml);
      new BannerWrap("#banner-wrap","#banner-list");
      new BannerWrap("#teacherWrap","#teacherList",2);
      for (var i=0;i<4;i++) {
        $('.course-cnt .item').eq(i).find('img').attr('src','../../../images/index-course0'+(i+1)+'.jpg');
      }

    })
  }
}
$(function () {
  // 渲染banner的html
  _home.init();
})
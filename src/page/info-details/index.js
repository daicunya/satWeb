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

$(function () {
  var id = _util.getUrlParam('id'),
      rendHtml = '';
  _utilService.infoDetails(id,function (res) {
    rendHtml = _util.renderHtml(templateInfo,{
      dataList : res
    });
    $('.info-wrap').html(rendHtml);
    var num = $('.info-article img').length,
        arr = [];
    for (var i=0;i<num;i++) {
      arr.push($('.info-article img').eq(i).attr('src'));
      $('.info-article img').eq(i).attr('src',"http://www.thinkusat.com"+arr[i]);
    }
    if (res.cate == '公开课') {
      $('.info-img img').attr('src','../../../images/index-course02.jpg')
    }
  })
})
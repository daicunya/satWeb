/**
 * Created by daicunya on 2017/10/18.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _topicService     = require('service/topic-service.js');

var _evaluation = {
  init : function () {
    this.onLoad();
  },
  onLoad    : function () {
    this.evalEvent();
  },
  evalEvent : function () {
    _topicService.evalIndex(function (res) {
      for (var i in res.data) {
        $('.eval-wrap li').eq(i).children('a').attr('href','./mockNote.html?tpId='+res.data[i].tpId);
      }
    })
  }
};
$(function () {
  _evaluation.init();
})
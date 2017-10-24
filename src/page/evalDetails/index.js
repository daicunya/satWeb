/**
 * Created by daicunya on 2017/10/20.
 */
'use strict';
require('./index.styl');

var _util             = require('util/util.js');
var _topicService     = require('service/topic-service.js');

var _evalDetails = {
  init : function () {
   this.bindEvent();
  },
  bindEvent : function () {

  }
};
$(function () {
  _evalDetails.init();
})
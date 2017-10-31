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
var templateExercise = require('./index.string');

var _userExercise = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad : function () {
    this.loadTemp();
  },
  bindEvent: function () {

  },
  loadTemp : function () {
    var rendHtml = '';
    _userService.userExercise('',function (res) {
      console.log(res);
      rendHtml = _util.renderHtml(templateExercise,{
        dataList : res
      });
      $('.user-wrap').html(rendHtml);
    });
  }
};
$(function () {
  _userExercise.init();
  _delete.touch('user-wrap','user-item');
})
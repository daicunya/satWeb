/**
 * Created by daicunya on 2017/10/26.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _delete = require('../common/js/touchDelete.js');
var _userService = require('service/user-service.js');

var _userExercise = {
  data : {
    p : 1,
    major : 'Reading'
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad : function () {
    var listParam = this.data;
    _userService.userExercise(listParam,function (res) {
      console.log(res);
    });
  },
  bindEvent: function () {

  }
};
$(function () {
  _userExercise.init();
  _delete.touch('user-wrap','user-item');
})
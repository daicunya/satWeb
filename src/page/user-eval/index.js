/**
 * Created by daicunya on 2017/10/25.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _delete = require('../common/js/touchDelete.js');
var _userService = require('service/user-service.js');

var _center = {
  data : {
    p : 1
  },
  init : function () {
    this.onLoad();
  },
  onLoad : function () {
    var _this = this,
        listParam = this.data;
    _userService.userEval(listParam,function (res) {
      console.log(res);
    })
  }
};

$(function () {
  _center.init();
  _delete.touch('user-wrap','user-item');
})

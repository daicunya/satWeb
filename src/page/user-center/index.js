/**
 * Created by daicunya on 2017/10/25.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _userService = require('service/user-service.js');

$(function () {
  $('.login-out').tap(function () {
    _userService.loginOut(function (res) {
      console.log(res);
      sessionStorage.removeItem('userSuccessCode');
      window.location.href = './index.html';
    });
  })
})

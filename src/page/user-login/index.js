/**
 * Created by daicunya on 2017/10/24.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _util = require('util/util.js');
var _userService = require('service/user-service.js');


var _login = {
  init : function () {
    this.bindEvent();
  },
  bindEvent : function () {
    var _this = this;
    $('input').blur(function () {
      if (!$(this).val()) {
        var msg = $(this).attr('nullmsg');
        $(this).siblings('span').css('visibility', 'visible').html(msg);
      }
    });
    $('#logBtn').tap(function(){
      $('.validform-checktip').css('visibility','hidden');
      _this.submit();
    })
  },
  submit : function () {
    var formData = {
      userName : $.trim($('#username').val()),
      pass : $.trim($('#password').val())
    };
    _userService.loginInter(formData, function(res){
      var num = Math.floor(Math.random()*Math.pow(10,10));
      sessionStorage.setItem('userSuccessCode',num);
      window.location.href = _util.getUrlParam('redirect') || './user-center.html';
    }, function(err){
      console.log(err);
      $('.wrong-msg').css('visibility','visible').html(err.message)
    })
  }
};
$(function () {
  _login.init();
});


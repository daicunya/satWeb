/**
 * Created by daicunya on 2017/10/24.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _util = require('util/util.js');
var _userService = require('service/user-service.js');


var _register = {
  init : function () {
    this.bindEvent();
  },
  bindEvent : function () {
    var _this = this;
    //表单失焦验证格式
    $('input').blur(function () {
      var val = $(this).val(),
          name = $(this).attr('name');
      console.log(name);
      if (!val) {
        var msg = $(this).attr('nullmsg');
        $(this).siblings('span').css('visibility', 'visible').html(msg);
      } else {
        if (name == 'phone') {
          if (!_util.validate(val,'phone')) {
            $(this).siblings('span').css('visibility', 'visible').html('手机格式不正确');
          } else {
            $(this).siblings('span').css('visibility', 'visible').html('')
          }
        }
        if (name == 'pass') {
          if (val.length < 6) {
            $(this).siblings('span').css('visibility', 'visible').html('密码不少于6位');
          } else {
            $(this).siblings('span').css('visibility', 'visible').html('')
          }
        }
        if (name == 'confirmPass') {
          if (val != $('#password').val()) {
            $(this).siblings('span').css('visibility', 'visible').html('两次密码不一致');
          } else {
            $(this).siblings('span').css('visibility', 'visible').html('')
          }
        }
      }
    });
    //获取验证码
    $('#codeBtn').tap(function () {
      var phoneNum = $('#phone').val();
      if (!phoneNum) {
        $('#phone').siblings('span').css('visibility', 'visible').html('手机号不能为空');
      } else {
        _userService.phoneInter(phoneNum,function (res) {
          console.log(res);
          $('#phone').siblings('span').css('visibility','visible').html('验证码有效期十分钟')
        });
      }
    });
    //注册按钮
    $('#registerBtn').tap(function(){
      $('.validform-checktip').css('visibility','hidden');
      _this.submit();
    })
  },
  submit : function () {
    var formData = {
      userName          : $.trim($('#username').val()),//用户名
      pass              : $.trim($('#password').val()),//密码
      registerStr       : $.trim($('#phone').val()),//注册手机号
      verificationCode  : $.trim($('#enterCode').val()),//验证码
      sourde            : 'SATwap',
      type              : 1
    },
      // 表单验证结果
      validateResult = this.formValidate(formData);
    if (validateResult.status) {
      _userService.registerInter(formData, function(res){
        window.location.href = './result.html?type=register';
      }, function(err){
        $('.wrong-msg').css('visibility','visible').html(err.message)
      });
    } else {
      $('.wrong-msg').css('visibility','visible').html(validateResult.msg)
    }
  },
  // 表单字段的验证
  formValidate : function(formData){
    var result = {
      status  : false,
      msg     : ''
    };
    // 验证用户名是否为空
    if(!_util.validate(formData.userName, 'require')){
      result.msg = '用户名不能为空';
      return result;
    }
    // 验证密码是否为空
    if(!_util.validate(formData.pass, 'require')){
      result.msg = '密码不能为空';
      return result;
    }
    // 验证密码长度
    if(formData.pass.length < 6){
      result.msg = '密码长度不能少于6位';
      return result;
    }
    // 验证两次输入的密码是否一致
    if(formData.pass !== $('#confirmPass').val()){
      result.msg = '两次输入的密码不一致';
      return result;
    }
    // 验证手机号
    if(!_util.validate(formData.registerStr, 'phone')){
      result.msg = '手机号格式不正确';
      return result;
    }
    // 通过验证，返回正确提示
    result.status   = true;
    result.msg      = '验证通过';
    return result;
  }
};
$(function () {
  _register.init();
});

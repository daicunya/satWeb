/**
 * Created by daicunya on 2017/10/24.
 */
'use strict';

var _util = require('util/util.js');

var _userService = {
  //用户注册
  registerInter     : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/register'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //手机验证码接口
  phoneInter     : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/phone-code'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //用户登录
  loginInter     : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/check-login'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //找回密码
  passResetInter    : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/find-pass'),
      data: dataList,
      success: resolve,
      error: reject
    })
  }
}
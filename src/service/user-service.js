/**
 * Created by daicunya on 2017/10/24.
 */
'use strict';

var _util = require('util/util.js');

var _userService = {
  //用户注册
  registerInter   : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/register'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //手机验证码接口
  phoneInter      : function (number,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/phone-code'),
      data: {
        phone: number
      },
      success: resolve,
      error: reject
    })
  },
  //用户登录
  loginInter      : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/check-login'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //找回密码
  passResetInter  : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/find-pass'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //退出登录
  loginOut        : function (resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/login-out'),
      success: resolve,
      error: reject
    })
  },
  //收藏的题目
  userCollect     : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/person-collect'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //模考记录
  userMock        : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/person-mock'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //练习记录
  userExercise     : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/person-exercise'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //测评记录
  userEval          : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/eval'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //删除报告
  delReport          : function (item,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/del'),
      data: {
        id : item
      },
      success: resolve,
      error: reject
    })
  },
  //删除做题记录
  delTopic          : function (id,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/removed'),
      data: {
        id : id
      },
      success: resolve,
      error: reject
    })
  },
  //删除测评记录
  delEval          : function (id,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/delete'),
      data: {
        id : id
      },
      success: resolve,
      error: reject
    })
  }
};
module.exports = _userService;
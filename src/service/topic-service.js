/**
 * Created by daicunya on 09/10/2017.
 */
'use strict';

var _util = require('util/util.js');

var _mockService = {
  //练习二级页面
  exerciseIndex     : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/exer-index'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //练习详情页第一题
  exerciseDetail    : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/exer-details'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //练习上下题接口
  nextDetails       : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/notes'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //练习结果接口
  exerciseResult    : function (resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/notes'),
      data: '',
      success: resolve,
      error: reject
    })
  },
  //练习收藏题目接口
  collectTopic      : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/collection'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //模考二级页面
  mockIndex         : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/mock-index'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //模考提示页
  mockNotice        : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/mock-notice'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //模考详情页第一题
  mockDetails       : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/mock-details'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //模考上下题接口
  mockNext          : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/mock-next'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //模考报告接口
  mockReport        : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/mock-report'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //测评提示页
  evalNotice        : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/evaulation-notice'),
      data: dataList,
      success: resolve,
      error: reject
    })
  }
};
module.exports = _mockService;

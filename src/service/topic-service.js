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
  //练习报告接口
  exerciseResult    : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/result'),
      data: dataList,
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
  mockReport        : function (data,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/mock-report'),
      data: {
        id: data
      },
      success: resolve,
      error: reject
    })
  },
  //练习、模考、测评中途退出
  getOut            : function (resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/leave'),
      success: resolve,
      error: reject
    })
  },
  //测评二级页面
  evalIndex         : function (resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/evaulation-index'),
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
  },
  //测评详情页第一题
  evalTest          : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/evaulation-test'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //测评下一题
  evalNext          : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/evaulation-next'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //测评报告
  evalReport        : function (id,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/evaulation-report'),
      data: {
        id : id
      },
      success: resolve,
      error: reject
    })
  },
  //题目收藏
  collection        : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/collection'),
      data: dataList,
      success: resolve,
      error: reject
    })
  }
};
module.exports = _mockService;

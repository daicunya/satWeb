/**
 * Created by daicunya on 2017/10/30.
 */
'use strict';
var _util = require('util/util.js');

var _utilService = {
  //首页
  satIndex  : function (resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/sat'),
      success: resolve,
      error: reject
    })
  },
  //资讯二级页面
  infoIndex     : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/info'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  //资讯详情页
  infoDetails   : function (id,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/info-details'),
      data: {
        id : id
      },
      success: resolve,
      error: reject
    })
  },
  courseIndex   : function (resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/class'),
      success: resolve,
      error: reject
    })
  },
  courseDetails  : function (id,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/class-details'),
      data: {
        id : id
      },
      success: resolve,
      error: reject
    })
  },
  //公开课二级页面
  pubClass  : function (resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/pub-class'),
      success: resolve,
      error: reject
    })
  },
  //名师二级页面
  teacher  : function (resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/teacher'),
      success: resolve,
      error: reject
    })
  },
  //名师详情页
  teacherDetails  : function (id,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/teacher-details'),
      data : {
        id : id
      },
      success: resolve,
      error: reject
    })
  },
  //搜索
  search : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/search'),
      method : 'get',
      data : dataList,
      success: resolve,
      error: reject
    })
  }
}
module.exports = _utilService;
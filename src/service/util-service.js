/**
 * Created by daicunya on 2017/10/30.
 */
'use strict';
var _util = require('util/util.js');

var _utilService = {
  infoIndex     : function (dataList,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/info'),
      data: dataList,
      success: resolve,
      error: reject
    })
  },
  infoDetails    : function (id,resolve,reject) {
    _util.request({
      url: _util.getServerUrl('/cn/wap-api/info-details'),
      data: {
        id : id
      },
      success: resolve,
      error: reject
    })
  }
}
module.exports = _utilService;
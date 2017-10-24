/**
 * Created by daicunya on 2017/9/18.
 */
'use strict';

var Hogan = require('hogan');
var conf = {
  serverHost: 'http://sat.com'
};

var _util = {
  //  网络请求
  request : function(param){
    var _this = this;
    $.ajaxSettings.beforeSend = function(xhr) {
      xhr.withCredentials = true;
    };
    $.ajax({
      type        : param.method  || 'post',
      url         : param.url     || '',
      dataType    : param.type    || 'json',
      data        : param.data    || '',
      success     : function(res){
        // 请求成功
        if(0 === res.code){
          typeof param.success === 'function' && param.success(res.data);
        }
        // 没有登录状态，需要强制登录
        else if(5 === res.code){
          // _this.doLogin();
          alert('请登录');
        }
        // 请求数据错误
        else if(1 === res.code){
          typeof param.error === 'function' && param.error(res);
        }
      },
      error       : function(err){
        typeof param.error === 'function' && param.error(err.msg);
      }
    });
  },
  //获取服务器地址
  getServerUrl  : function (path) {
    return conf.serverHost + path;
  },
  //获取url参数
  getUrlParam : function(name){
    var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result  = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  //渲染html模板
  renderHtml    : function (htmlTemplate,data) {
    var template = Hogan.compile(htmlTemplate),
        result   = template.render(data);
    return result;
  },
  // 统一登录处理
  doLogin       : function(){
    window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
  }
};
module.exports = _util;
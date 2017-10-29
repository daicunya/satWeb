/**
 * Created by daicunya on 2017/9/21.
 */
'use strict';

require('./index.styl');
// var $ = require('util/js/zepto.min.js');
var _util = require('util/util.js');

var _footer = {
  data: {
    WIN         : $(window),
    footer_nav  : $('.footer-nav')
  },
  init: function () {
    this.bindEvent();
  },
  bindEvent: function () {
    var _this = this;
    // $('.article-action-mid').click(function () {
    //   _this.articleEvent();
    // });
    $('section').click(function (e) {
      _this.articleEvent();
    });
    _this.data.WIN.scroll(function () {
      _this.data.footer_nav.hide();
    });
    $('#myLogin').tap(function () {
      if (sessionStorage.getItem('userSuccessCode')) {
        window.location.href='./user-center.html';
      } else {
        _util.doLogin();
      }
    })
  },
  articleEvent: function () {
    var _this = this;
    if (_this.data.footer_nav.css('display') == 'none'){
      _this.data.footer_nav.show();
    } else {
      _this.data.footer_nav.hide();
    }
  }
};

$(function () {
  _footer.init();
})

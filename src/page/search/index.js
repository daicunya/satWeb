/**
 * Created by daicunya on 2017/10/24.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _util = require('util/util.js');
var _utilService = require('service/util-service.js');
var templateInfo = require('./info.string');
var templateQue = require('./question.string');
var templateQueMore = require('./queMore.string');
var templateInfoMore = require('./infoMore.string');

var _search = {
  init : function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad : function () {
    if ($('.search-text input').val()) {
      this.keySearch();
    }
  },
  bindEvent : function () {
    var _this = this;
    $('.search-select>p').tap(function () {
      $('.search-select>ul').toggle();
    });
    $('.search-select>i').tap(function () {
      $('.search-select>ul').toggle();
    });
    $('.search-select>ul li').tap(function () {
      $('.search-select>p').html($(this).html());
      $('.search-select>ul').hide();
    });
    $('.search-btn').tap(function () {
      _this.keySearch();
    });
    $('.search-result').on('tap','.p-info-more',function () {
      var $this = $(this);
      _this.moreHtml($this);
    })
  },
  keySearch : function () {
    if ($('.search-select>p').html() == '题目') {
      var cate = 'question'
    } else {
      var cate = 'info';
    }
    var keyword = $('.search-text input').val();
    var dataList = {
      cate : cate,
      keyword : keyword
    };
    var rendHtml = '';
    _utilService.search(dataList,function (res) {
      console.log(res);
      if (res.cate == 'question') {
        rendHtml = _util.renderHtml(templateQue,{
          dataList : res
        })
      } else {
        rendHtml = _util.renderHtml(templateInfo,{
          dataList : res
        })
      }
      $('.search-result').html(rendHtml);
    })
  },
  moreHtml : function ($this) {
    if ($('.search-select>p').html() == '题目') {
      var cate = 'question'
    } else {
      var cate = 'info';
    }
    var keyword = $('.search-text input').val();
    var dataList = {
      cate : cate,
      keyword : keyword,
      p : Number($this.data('p')+1)
    };
    var all = Number($this.data('all')),
        result = '';
    if (dataList.p <= all) {
      $.ajax({
        url :  _util.getServerUrl('/cn/wap-api/search'),
        type :'get',
        data : dataList,
        dataType : 'json',
        beforeSend : function () {
          $this.html('加载中……');
        },
        success : function (res) {
          var res = res.data;
          if (res.cate == 'question') {
            result = _util.renderHtml(templateQueMore,{
              dataList : res
            })
          } else {
            result = _util.renderHtml(templateInfoMore,{
              dataList : res
            })
          }
          $('.search-result>ul').append(result);
          $this.data('p',Number(res.Current)).html('浏览更多');
        }
      })
    } else {
      $this.hide().siblings('.p-info-bottom').show();
    }
  }
};
$(function () {
  _search.init();
})
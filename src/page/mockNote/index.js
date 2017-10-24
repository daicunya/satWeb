/**
 * Created by daicunya on 2017/10/11.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');

var _util = require('util/util.js');
var _topicService = require('service/topic-service.js');
var templateIndex = require('./index.string');

var _mockNote = {
  type : _util.getUrlParam('type') || '',
  data : {
    major : _util.getUrlParam('major') || '',
    tpId   : _util.getUrlParam('tpId') || ''
  },
  init            : function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad          : function () {
    //判断模考还是测评
    if (this.type == 'mock') {
      this.mNoteEvent();
    } else {
      this.evaluationEvent();
    }
  },
  bindEvent       : function () {
    var _this = this,
        major = this.data.major;
    $('.mock-start').tap(function () {
      if (_this.type == 'mock') {
        if (major) {
          window.location.href='./readDetails.html?type=mock&major='+major+'&tpId='+_this.data.tpId
        }else {
          window.location.href='./readDetails.html?type=mock&tpId='+_this.data.tpId
        }
      } else {
        window.location.href='./readDetails.html?type=evaluation&tpId='+_this.data.tpId
      }
    })
  },
  //模考请求接口
  mNoteEvent      : function () {
    var listParam = this.data,
        noteHtml  = '';
    _topicService.mockNotice(listParam,function (res) {
      console.log(res);
      noteHtml = _util.renderHtml(templateIndex,{
        dataList : res
      });
      $('.m-note-wrap').html(noteHtml);
    },function (err) {
      console.log(err);
    })
  },
  //测评请求接口
  evaluationEvent : function () {
    var listParam = this.data,
        rendHtml  = '';
    //删除多余的参数
    this.type ? '' : (delete listParam.major);
    _topicService.evalNotice(listParam,function (res) {
      rendHtml = _util.renderHtml(templateIndex,{
        dataList : res
      });
      $('.m-note-wrap').html(rendHtml);
    },function (err) {
      console.log(err);
    })
  }
};
$(function () {
  _mockNote.init();
})
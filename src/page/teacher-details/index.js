/**
 * Created by daicunya on 2017/10/31.
 */
'use strict';
require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');
var _util           = require('util/util.js');
var _utilService    = require('service/util-service.js');
var template        = require('./index.string');
var templateCourse  = require('./course.string');

$(function () {
  var id = _util.getUrlParam('id'),
      rendHtml = '';
  _utilService.teacherDetails(id,function (res) {
    rendHtml = _util.renderHtml(template,{
      dataList : res
    });
    _utilService.courseIndex(function (res) {
      rendHtml+= _util.renderHtml(templateCourse,{
        dataCnt : res
      });
      $('.teacher-details').append(rendHtml);
    })
  })

})
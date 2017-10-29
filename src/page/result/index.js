/**
 * Created by daicunya on 2017/10/24.
 */
'use strict';

require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');

var _util = require('util/util.js');

$(function(){
  var type        = _util.getUrlParam('type') || 'default',
      $element    = $('.' + type + '-success');
  // 显示对应的提示元素
  $element.show();
})
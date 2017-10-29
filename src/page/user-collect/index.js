/**
 * Created by daicunya on 2017/10/26.
 */
'use strict';
require('./index.styl');
require('../common/header/index.js');
require('../common/footer/index.js');
var _delete = require('../common/js/touchDelete.js');

$(function () {
  _delete.touch('user-wrap','user-item');
})
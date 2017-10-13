/**
 * Created by daicunya on 2017/9/25.
 */
'use strict';

require('./index.styl');
require('util/slider/slider.js');

var _util = require('util/util.js');
var templateBanner = require('./index.string');


var _slider = function () {

  // init: function () {
  //   this.renderBanner();
  // },
  // renderBanner: function () {
    var bannerHtml  = _util.renderHtml(templateBanner);
    $('.p-slider').html(bannerHtml);
  // }
};
module.exports = _slider;
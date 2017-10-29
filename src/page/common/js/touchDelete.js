/**
 * Created by daicunya on 2017/10/26.
 */
'use strict';
var _delete =  {
  touch : function (parent,obj) {
    var parentObj = document.getElementsByClassName(parent)[0];
    var initX,//初始X位置
        initY,//初始Y位置
        moveX,//滑动时的X轴位置
        moveY,//滑动时的X轴位置
        X = 0,//X轴移动距离
        Y = 0,//Y轴移动距离
        objX = 0;//位移后的距离
    parentObj.addEventListener('touchstart',function (e) {
      var e = e || window.event,
          target = e.target || e.srcElement;
      initY = e.touches[0].pageY;
      if (target.parentNode.className == obj) {
        initX = e.touches[0].pageX;
        objX = ($(this).get(0).style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
      }
    });
    parentObj.addEventListener('touchmove',function (e) {
      var e = e || window.event,
          target = e.target.parentNode || e.srcElement.parentNode;
      moveY = e.changedTouches[0].pageY;
      Y = Math.abs(initY - moveY);
      if (Y < 35){
        e.preventDefault();//阻止浏览器默认事件
      }
      if (target.className == obj) {
        moveX = e.changedTouches[0].pageX;
        X = initX - moveX;
        if (objX == 0) {
          if ((0 < X) && (X < 60)) {
            target.style.WebkitTransform = "translateX(" + -X + "px)";
          } else if (0 >= X) {
            target.style.WebkitTransform = "translateX(" + 0 + "px)";
          }
        } else if (objX < 0) {
          if (X <= 0) {
            var r = Math.abs(X)-60;
            target.style.WebkitTransform = "translateX(" + r + "px)";
            if (r >= 0 ) {
              target.style.WebkitTransform = "translateX(0px)";
            }
          } else {
            $(this).get(0).style.WebkitTransform = "translateX(-60px)";
          }
        }
      }
    });
    parentObj.addEventListener('touchend',function (e) {
      var e = e || window.event,
          target = e.target.parentNode || e.srcElement.parentNode;
      e.preventDefault();//阻止鼠标事件被触发
      if (target.className == obj) {
        objX = (target.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
        if (objX > -30) {
          target.style.WebkitTransform = "translateX(" + 0 + "px)";
          objX = 0;
        } else {
          target.style.WebkitTransform = "translateX(" + -60 + "px)";
          objX = -60;
        }
      }
    })
  }
};
module.exports = _delete;

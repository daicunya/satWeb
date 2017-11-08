/**
 * Created by daicunya on 2017/11/1.
 */
'use strict';
require('./index.styl');

(function () {
  function BannerWrap(obj1,obj2,num){
    var _this = this;
    this.config = {
      _this       : this,
      banner      : document.querySelector(obj1),
      list        : document.querySelector(obj2),
      rootWidth   : -document.documentElement.clientWidth,
      startX      : 0,
      index       : 0,
      translateX  : 0,
      tid         : null,
      lis         : null,
      points      : null,
      num         : num
    };
    this.rendHtml(num);
    //手指按下
    this.config.banner.addEventListener('touchstart', function (ev) {
      //禁止浏览器默认滑动事件
      // ev.preventDefault();
      _this.config.startX = ev.changedTouches[0].clientX;
      //关闭过渡效果
      _this.config.list.style.transition = "0s";
      //关闭自动轮播
      clearInterval(_this.config.tid);
      //无缝滑屏 改变index
      _this.changeIndex();
    });
    //手指滑动
    this.config.banner.addEventListener('touchmove', function (ev) {
      //滑动差值
      var dis = ev.changedTouches[0].clientX - _this.config.startX;
      //当前list总平移长度
      _this.config.translateX = _this.config.rootWidth * _this.config.index + dis;
      //响应list滑动平移
      _this.changePage(0, _this.config.translateX,_this.config.num);
    });
    //手指抬起
    this.config.banner.addEventListener('touchend', function () {
      //根据滑动长度求索引
      _this.config.index = Math.round(_this.config.translateX / _this.config.rootWidth);
      //越界判断
      if (_this.config.index < 0) {
        _this.config.index = 0;
      } else if (_this.config.index > _this.config.lis.length - 1) {
        _this.config.index = _this.config.lis.length - 1;
      }
      _this.changePage(.3, _this.config.rootWidth * _this.config.index,_this.config.num);
      _this.changePoint();
      _this.autoPlay();
    });
    _this.autoPlay();
  }
  BannerWrap.prototype = {
    //渲染模板
    rendHtml : function (num) {
      //添加一组
      this.config.list.innerHTML += this.config.list.innerHTML;
      //设置list宽度
      this.config.lis = this.config.list.querySelectorAll("li");
      if (num) {
        this.config.list.style.width = this.config.lis.length/2 + "00%";
      } else {
        this.config.list.style.width = this.config.lis.length + "00%";
      }

      //设置li宽度
      for (var i = 0; i < this.config.lis.length; i++) {
        this.config.lis[i].style.width = 100 / this.config.lis.length + "%";
      }
      //创建point div
      var pointDiv = document.createElement("div");
      pointDiv.setAttribute("class", "point");
      for (var i = 0; i < this.config.lis.length / 2; i++) {
        var span = document.createElement("span");
        if (i == 0) {
          span.classList.add('active');
        }
        pointDiv.appendChild(span);
      }
      this.config.banner.appendChild(pointDiv);
      this.config.points = this.config.banner.querySelectorAll(".point span");
    },
    //更改索引 实现无缝滑屏
    changeIndex : function () {
      if (this.config.index == 0) {
        //当显示第一张图片 切换到下一组的第一张
        this.config.index = this.config.points.length;
      } else if (this.config.index == this.config.lis.length - 1) {
        //当显示最后一张 切换到上一组的最后一张
        this.config.index = this.config.points.length - 1;
      }
    },
    //设置小圆点
    changePoint : function () {
      for (var i = 0; i < this.config.points.length; i++) {
        this.config.points[i].classList.remove('active');
      }
      this.config.points[this.config.index % (this.config.points.length)].classList.add('active');
    },
    //滑动页面 平移list
    changePage : function (duration, translateVal,num) {
      this.config.list.style.transition = duration + "s";
      if (num) {
        this.config.list.style.transform = "translateX(" + translateVal/num + "px)";
      } else {
        this.config.list.style.transform = "translateX(" + translateVal + "px)";
      }
    },
    //自动轮播
    autoPlay : function () {
      var _this = this;
      this.config.tid = setInterval(function () {
        _this.changeIndex();
        _this.changePage(0,  _this.config.rootWidth *  _this.config.index,_this.config.num);
        //延时执行，为了让页面切换完毕
        setTimeout(function () {
          _this.config.index++;
          _this.changePage(.3,  _this.config.rootWidth *  _this.config.index,_this.config.num);
          _this.changePoint();
        }, 500);
      }, 3000);
    }
  }
  window.BannerWrap = BannerWrap;
})();


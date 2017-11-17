/**
 * Created by daicunya on 2017/9/16.
 */
var webpack           = require('webpack');
var path              = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin 参数的方法
var getHtmlConfig = function (name,title) {
  return {
    template  : './src/view/'+ name +'.html',
    filename  : 'view/'+ name +'.html',
    favicon   : './favicon.ico',
    inject    : true,
    hash      : true,
    title     : title,
    chunks    : ['common',name]
  }
};
//webpack config
var config = {
  //entry js的入口文件
  entry: {
    'common'            : ['./src/page/common/index.js'],
    'index'             : ['./src/page/index/index.js'],
    'user-login'        : ['./src/page/user-login/index.js'],
    'user-register'     : ['./src/page/user-register/index.js'],
    'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
    'result'            : ['./src/page/result/index.js'],
    'exercise'          : ['./src/page/exercise/index.js'],
    'mock'              : ['./src/page/mock/index.js'],
    'mockNote'          : ['./src/page/mockNote/index.js'],
    'readDetails'       : ['./src/page/readDetails/index.js'],
    'report'            : ['./src/page/report/index.js'],
    'evaluation'        : ['./src/page/evaluation/index.js'],
    'evalDetails'       : ['./src/page/evalDetails/index.js'],
    'search'            : ['./src/page/search/index.js'],
    'user-center'       : ['./src/page/user-center/index.js'],
    'user-mock'         : ['./src/page/user-mock/index.js'],
    'user-exercise'     : ['./src/page/user-exercise/index.js'],
    'user-eval'         : ['./src/page/user-eval/index.js'],
    'user-collect'      : ['./src/page/user-collect/index.js'],
    'information'       : ['./src/page/information/index.js'],
    'info-details'      : ['./src/page/info-details/index.js'],
    'course'            : ['./src/page/course/index.js'],
    'course-details'    : ['./src/page/course-details/index.js'],
    'pubClass'          : ['./src/page/pubClass/index.js'],
    'pubDetails'        : ['./src/page/pubDetails/index.js'],
    'teacher'           : ['./src/page/teacher/index.js'],
    'teacher-details'   : ['./src/page/teacher-details/index.js'],
    'about'             : ['./src/page/about/index.js']
  },
  //output: 目标文件
  output: {
    path        : __dirname + '/dist/',
    publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '//m.thinkusat.com/dist/',
    filename    : 'js/[name].js'
  },
  //externals:外部依赖的声明
  externals: {
    // 'jquery': 'window.jQuery'
  },
  module: {
    loaders: [
      { test: /\.css$/, use: ['style-loader','css-loader']},
      { test: /\.styl$/, use:  ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','stylus-loader'] })},
      { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=1000&name=resource/[name].[ext]'},
      {
        test: /\.string$/,
        loader: 'html-loader',
        query : {
          minimize : true,
          removeAttributeQuotes : false
        }
      }
    ]
  },
  resolve : {
    //定义别名
    alias : {
      node_modules    : __dirname + '/node_modules',
      util            : __dirname + '/src/util',
      page            : __dirname + '/src/page',
      service         : __dirname + '/src/service',
      images          : __dirname + '/images'
    }
  },
  plugins: [
    //  独立通用模块到js/common.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/common.js'
    }),
    //  把CSS单独打包
    new ExtractTextPlugin("css/[name].css"),
    //  HTML模板处理
    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login','登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register','注册')),
    new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('exercise','练习')),
    new HtmlWebpackPlugin(getHtmlConfig('mock','模考')),
    new HtmlWebpackPlugin(getHtmlConfig('mockNote','模考提示页')),
    new HtmlWebpackPlugin(getHtmlConfig('readDetails','做题详情页')),
    new HtmlWebpackPlugin(getHtmlConfig('report','报告')),
    new HtmlWebpackPlugin(getHtmlConfig('evaluation','测评')),
    new HtmlWebpackPlugin(getHtmlConfig('evalDetails','测评详情页')),
    new HtmlWebpackPlugin(getHtmlConfig('search','搜索')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-mock','模考记录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-exercise','练习记录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-eval','测评记录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-collect','收藏记录')),
    new HtmlWebpackPlugin(getHtmlConfig('information','资讯')),
    new HtmlWebpackPlugin(getHtmlConfig('info-details','资讯详情')),
    new HtmlWebpackPlugin(getHtmlConfig('course','课程')),
    new HtmlWebpackPlugin(getHtmlConfig('course-details','课程详情')),
    new HtmlWebpackPlugin(getHtmlConfig('pubClass','公开课')),
    new HtmlWebpackPlugin(getHtmlConfig('pubDetails','公开课详情')),
    new HtmlWebpackPlugin(getHtmlConfig('teacher','名师团队')),
    new HtmlWebpackPlugin(getHtmlConfig('teacher-details','名师详情')),
    new HtmlWebpackPlugin(getHtmlConfig('about','关于我们'))
  ]
};
if ('dev' === WEBPACK_ENV) {//开发环境下
  config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
}
module.exports = config;
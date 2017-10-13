/**
 * Created by daicunya on 2017/9/16.
 */
var webpack           = require('webpack');
var path              = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


//环境变量配置
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
// console.log(WEBPACK_ENV);

//获取html-webpack-plugin 参数的方法
var getHtmlConfig = function (name,title) {
  return {
    template: './src/view/'+ name +'.html',
    filename: 'view/'+ name +'.html',
    inject: true,
    hash: true,
    title: title,
    chunks: ['common',name]
  }
};
//webpack config
var config = {
  //entry js的入口文件
  entry: {
    common        : ['./src/page/common/index.js'],
    index         : ['./src/page/index/index.js'],
    exercise      : ['./src/page/exercise/index.js'],
    mock          : ['./src/page/mock/index.js'],
    mockNote      : ['./src/page/mockNote/index.js'],
    readDetails   : ['./src/page/readDetails/index.js']
  },
  //output: 目标文件
  output: {
    path        : path.resolve(__dirname, "dist"),
    publicPath  : '/dist/',
    filename    : 'js/[name].js'
  },
  //externals:外部依赖的声明
  externals: {
    // 'zepto': 'window.zepto'
  },
  module: {
    loaders: [
      { test: /\.css$/, use: ['style-loader','css-loader']},
      { test: /\.styl$/, use:  ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','stylus-loader'] })},
      { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=1000&name=resource/[name].[ext]'},
      { test: /\.string$/,loader: 'html-loader' }
    ]
  },
  resolve : {
    //定义别名
    alias : {
      node_modules    : __dirname + '/node_modules',
      util            : __dirname + '/src/util',
      page            : __dirname + '/src/page',
      service         : __dirname + '/src/service',
      images          : __dirname + '/src/images'
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
    new HtmlWebpackPlugin(getHtmlConfig('exercise','练习')),
    new HtmlWebpackPlugin(getHtmlConfig('mock','模考')),
    new HtmlWebpackPlugin(getHtmlConfig('mockNote','模考提示页')),
    new HtmlWebpackPlugin(getHtmlConfig('readDetails','做题详情页'))
  ]
};
if ('dev' === WEBPACK_ENV) {
  config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
}
module.exports = config;
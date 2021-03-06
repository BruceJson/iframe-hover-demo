var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

var config = require('../config');
var webpackBaseConfig = require('./webpack.base.conf');

module.exports = merge(webpackBaseConfig, {
    devtool: 'eval-source-map', // source-map

    devServer: {
        contentBase: path.join(__dirname, '..'), //本地服务器所加载的页面所在的目录
        port: 8888,
        inline: true, //实时刷新
        historyApiFallback: true, //不跳转
        hot: true // 开启热重载
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }),


        // 定义全局变量
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'lodash',
            bootbox: 'bootbox'
        }),

        // 编译html
        new HtmlWebpackPlugin({
            filename: 'index.html', //new 目标编译出的文件的文件名
            template: 'index.html', //new 一个这个插件的实例，并传入相关的参数
            inject: true // 是否把js文件插入到body的最后
        }),

        // extra style.css 引入

        new ExtractTextPlugin({
            filename: path.posix.join('assets', 'css/[name].[contenthash].css')
        }),

        //热加载插件
        new webpack.HotModuleReplacementPlugin()
    ]
});

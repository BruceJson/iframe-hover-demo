var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackDevConfig = require('./webpack.dev.conf');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

var compiler = webpack(webpackDevConfig);

var server = new WebpackDevServer(compiler, {
    // webpack-dev-server options

    contentBase: path.join(__dirname, '..'), //本地服务器所加载的页面所在的目录
    port: 8888,
    inline: true, //实时刷新
    historyApiFallback: true, //不跳转
    hot: true // 开启热重载
});
server.listen(8888, "localhost", function () {});
// server.close();

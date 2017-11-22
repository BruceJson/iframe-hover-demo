var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var webpack = require('webpack');

function resolve(url) {
    return path.join(__dirname, url);
}

module.exports = {
    entry: {
        main: resolve('src/main.js')
    },

    output: {
        path: resolve('dist'),
        filename: path.posix.join('assets', 'js/[name].[hash:7].js')
    },

    devtool: 'eval-source-map', // source-map

    devServer: {
        contentBase: "./", //本地服务器所加载的页面所在的目录
        port: 8888,
        inline: true, //实时刷新
        historyApiFallback: true, //不跳转
        hot: true // 开启热重载
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader'
            },
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader'
                }]
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'less-loader'
                }]
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'less-loader'
                }]
            })
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: path.posix.join('assets', 'img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: path.posix.join('assets', 'fonts/[name].[hash:7].[ext]')
            }
        }]
    },

    plugins: [
        // 定义全局变量
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'lodash',
            bootbox: 'bootbox'
        }),

        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'static'),
            to: path.join(__dirname, 'dist/static'),
            ignore: ['.*']
        }]),

        // 编译html
        new HtmlWebpackPlugin({
            filename: 'index.html', //new 目标编译出的文件的文件名
            template: 'index.html', //new 一个这个插件的实例，并传入相关的参数
            inject: true // 是否把js文件插入到body的最后
        }),

        //热加载插件
        new webpack.HotModuleReplacementPlugin(),

        // css压缩
        new OptimizeCssAssetsPlugin(),

        // js压缩
        new webpack.optimize.UglifyJsPlugin(),

        // extra style.css 引入
        new ExtractTextPlugin({
            filename: path.posix.join('assets', 'css/[name].[contenthash].css')
        }),

        new webpack.BannerPlugin('版权所有，翻版必究'),
    ],

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            '@static': resolve('static'),
            '@cfg': resolve('src/config')
        }
    }
}

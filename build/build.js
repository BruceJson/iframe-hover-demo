process.env.NODE_DEV = 'production';

var rm = require('rimraf');
var ora = require('ora');
var chalk = require('chalk');
var path = require('path');
var webpack = require('webpack');
var webpackProdConfig = require('./webpack.prod.conf.js');

var spinner = ora('building...')
spinner.start()

rm(path.join(__dirname, '../dist'), error => {
    if (error) throw error;
    webpack(webpackProdConfig, (err, stats) => {
        if (err) throw err;
        spinner.stop();

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.cyan('  ##### Build code:' + process.env.ROUTERSOFT_BUILDCODE + '\n'))
    });
});

// const co = require('co');
// const Client = require('aliyun-api-gateway').Client;
const axios = require('axios');
import commonCfg from '@cfg/common.conf.js';

// import store from '@/store';

// ajax方法类库
var ajax = {
    config: {
        host: commonCfg['API_DOMAIN']
    },
    // 普通ajax调用 ignoreHost
    doNet: function (req) {
        var options = {
            url: !req.ignoreHost ? (ajax.config.host + req.url) : req.url,
            method: req.method.toLowerCase(),
            headers: {
                'token': window.baseToken || '',
            },
            responseType: 'json'
        }
        if (req.method.toLowerCase() === 'get') {
            options.params = req.data || {}
        } else if (req.method.toLowerCase() === 'post') {
            options.data = req.data || {}
        }
        return axios(options)
    },
    // 普通ajax调用 ignoreHost
    doFormNet: function (req) {
        var options = {
            url: !req.ignoreHost ? (ajax.config.host + req.url) : req.url,
            method: req.method.toLowerCase(),
            headers: {
                'token': window.baseToken || '',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onUploadProgress: function (progressEvent) {
                req.onProgress && req.onProgress(progressEvent)
            }
        }
        if (req.method.toLowerCase() === 'get') {
            options.params = req.data || {}
        } else if (req.method.toLowerCase() === 'post') {
            options.data = req.data || {}
        }
        return axios(options)
    }
}
export default ajax

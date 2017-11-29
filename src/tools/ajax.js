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
    doNet: function(req) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: !req.ignoreHost ? (ajax.config.host + req.url) : req.url,
                async: true,
                type: req.method,
                data: req.data && req.data,
                beforeSend: function(xhr) {
                    if (req.header) {
                        for (var key in header) {
                            xhr.setRequestHeader(key, header[key]);
                        }
                    }
                },
                dataType: 'json',
                success: function(resp) {
                    if (typeof resp === 'string') {
                        resp = JSON.parse(resp);
                    }
                    if (resp.state == 1) {
                        resolve(resp);
                    } else {
                        reject(resp);
                    }
                },
                error: function(xhr, context) {
                    reject(context);
                }
            });
        });
    },
    // 表单提交含有文件的数据
    doFormNet: function(req) {
        return new Promise((resolve, reject) => {
            var oMyForm = new FormData();

            for (var i in req.data) {
                oMyForm.append(i, req.data[i]);
            }
            var xhr = new XMLHttpRequest();
            xhr.open(req.method, !req.ignoreHost ? (ajax.config.host + req.url) : req.url);
            // if (req.method.toLowerCase() === 'post') {
            //     xhr.setRequestHeader("Content-Type", "multipart/form-data");
            //     xhr.setRequestHeader('TOKEN', utils.config.token);
            // }
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    var resp = JSON.parse(xhr.responseText);
                    if (xhr.status === 200) {
                        if (resp.state == 1) {
                            resolve(resp);
                        } else {
                            reject(resp);
                        }
                    } else {
                        reject(resp);
                    }
                }
            };
            xhr.send(oMyForm);
        });
    },




    // doNet: function(req) {
    //     var options = {
    //         url: !req.ignoreHost ? (ajax.config.host + req.url) : req.url,
    //         method: req.method.toLowerCase(),
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             // 'token': window.baseToken || '',
    //         },
    //         // responseType: 'json'
    //     }
    //     if (req.method.toLowerCase() === 'get') {
    //         options.params = req.data || {}
    //     } else if (req.method.toLowerCase() === 'post') {
    //         options.data = req.data || {}
    //     }
    //     return axios(options)
    // },
    // // 普通ajax调用 ignoreHost
    // doFormNet: function(req) {
    //     var options = {
    //         url: !req.ignoreHost ? (ajax.config.host + req.url) : req.url,
    //         method: req.method.toLowerCase(),
    //         headers: {
    //             'token': window.baseToken || '',
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         onUploadProgress: function(progressEvent) {
    //             req.onProgress && req.onProgress(progressEvent)
    //         }
    //     }
    //     if (req.method.toLowerCase() === 'get') {
    //         options.params = req.data || {}
    //     } else if (req.method.toLowerCase() === 'post') {
    //         options.data = req.data || {}
    //     }
    //     return axios(options)
    // }


}
export default ajax

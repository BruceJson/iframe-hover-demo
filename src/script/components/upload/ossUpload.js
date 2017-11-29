var crypto = require("crypto");

import tools from '@/tools';
import global from '@/global';
import cfg from '@/config/common.conf';

var appServer = cfg["OSS_DOMAIN"] + "/oss/token";
var bucket = "rmt";
var region = "oss-cn-hangzhou";

var urllib = window.OSS.urllib;
var Buffer = window.OSS.Buffer;
var OSS = window.OSS.Wrapper;
var STS = window.OSS.STS;

class OssUploader {
    constructor() {
        console.log("====================== OssUploader =======================");
    }

    async initClient() {
        if (!this.client) {
            try {
                var res = await urllib.request(appServer, {
                    method: "GET"
                });

                var res = JSON.parse(res.data);
                var creds = res.data.Credentials;
                this.client = new OSS({
                    region: region,
                    accessKeyId: creds.AccessKeyId,
                    accessKeySecret: creds.AccessKeySecret,
                    stsToken: creds.SecurityToken,
                    bucket: bucket
                });
            } catch (e) {
                console.log(e);
                throw 'Get credits failed!'
            }
        }
    }

    upload(upfile, progress) {
        var file = upfile.file;
        return new Promise((resolve, reject) => {
            this.initClient().then(() => {
                // 获取md5文件名
                var md5 = crypto.createHash("md5");
                md5.update(Date.now() + "");
                var str = md5.digest("hex");
                //32位大写
                var key = global.platformId + "/" + tools.getTimeByType("yyyymmdd") + "/" + str.toUpperCase() + "." + file.name.split(".")[1];

                this.client.multipartUpload(key, file, {
                    progress: progress
                }).then(function() {
                    // 上传成功
                    resolve("http://storage.tmtsp.com/" + key);
                });
            })
        });
    }
}

export default new OssUploader();

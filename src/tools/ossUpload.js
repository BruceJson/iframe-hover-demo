var crypto = require("crypto");

var appServer = cfg["API_DOMAIN"] + "/oss/token";
var bucket = "rmt";
var region = "oss-cn-hangzhou";

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

class OssUploader {
    async initClient() {
        if (!this.client) {
            try {
                var res = await urllib.request(url, {
                    method: "GET"
                });

                var res = JSON.parse(resp.data);
                var creds = res.data.Credentials;
                this.client = new OSS({
                    region: region,
                    accessKeyId: creds.AccessKeyId,
                    accessKeySecret: creds.AccessKeySecret,
                    stsToken: creds.SecurityToken,
                    bucket: bucket
                });
            } catch (e) {
                throw 'Get credits failed!'
            }
        }
    }

    upload(file) {
        // 获取md5文件名
        var md5 = crypto.createHash("md5");
        md5.update(Date.now() + "");
        var str = md5.digest("hex");
        //32位大写
        var key = this.$store.getters.platformId + "/" + tools.getTimeByType("yyyymmdd") + "/" + str.toUpperCase() + "." + file.name.split(".")[1];
    }
}

// 获取md5文件名
var md5 = crypto.createHash("md5");
md5.update(Date.now() + "");
var str = md5.digest("hex");
var key =
    this.$store.getters.platformId +
    "/" +
    tools.getTimeByType("yyyymmdd") +
    "/" +
    str.toUpperCase() +
    "." +
    file.name.split(".")[1]; //32位大写

// 将file文件封装后，放入fileList中
this.fileList.push({
    uploadId: null,
    key: key,
    file: file,
    progress: "0%",
    state: "uploading",
    url: ""
});

// 上传文件
upload() {
    const file = this.fileList[0].file;

    const key = this.fileList[0].key;

    var self = this;

    return this.client.multipartUpload(key, file, {
        progress: this.progress,
        initUploadCb: function (uploadId) {
            console.log("init multipartupload success");
            console.log(uploadId);

            // 赋值uploadId
            self.fileList[0].uploadId = uploadId;
        }
    }).then(function (res) {
        // 上传成功
        self.fileList[0].url =
            "http://storage.tmtsp.com/" + self.fileList[0].key;
        self.fileList[0].state = "complete";
    });
}


// 初始化上传
applyTokenDo(func) {
    var self = this;
    const url = appServer;

    console.log(
        "=============2222222222222222222======================="
    );
    console.log(urllib);
    return urllib
        .request(url, {
            method: "GET"
        })
        .then(function (result) {
            var res = JSON.parse(result.data);
            var creds = res.data.Credentials;
            self.client = new OSS({
                region: region,
                accessKeyId: creds.AccessKeyId,
                accessKeySecret: creds.AccessKeySecret,
                stsToken: creds.SecurityToken,
                bucket: bucket
            });
            return func();
        });
},

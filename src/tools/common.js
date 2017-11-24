var tools = {
    postMessage(_window, param, origin) {
        _window.postMessage(param, origin);
    },

    getIframeHeight(iframe) {
        console.log(iframe.contentWindow.document.body);
        console.log(iframe.contentWindow.document.body.parentNode.offsetHeight);
        return iframe.contentWindow.document.body.parentNode.offsetHeight;
    },
    deepClone(obj) {
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.deepClone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.deepClone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    },

    getGuid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    getBase64Img(file) {
        return new Promise((resolve, reject) => {
            // 看支持不支持FileReader
            if (!file || !window.FileReader) {
                reject('对不起，您的浏览器无法生成预览图片~');
                return;
            }
            if (/^image/.test(file.type)) {
                // 创建一个reader
                var reader = new FileReader()
                    // 将图片将转成 base64 格式
                reader.readAsDataURL(file)
                    // 读取成功后的回调
                reader.onloadend = function (e) {
                    if (this.result) {
                        resolve(this.result);
                    } else {
                        reject('生成预览图片失败~');
                    }
                }
            } else {
                reject('请选择图片类型文件~');
            }
        });
    },

    param2Obj(url) {
        const search = url.split('?')[1];
        if (!search) {
            return {}
        }
        return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    },
};

export default tools;

import tools from '@/tools';
import UploadFile from './uploadFile';

var DEFAULT_IMG_SRC = '/static/img/default_1.png';

function createUploaderBox(defaultImgSrc = DEFAULT_IMG_SRC) {
    var domStr =
        `<div class='router_uploader_box'>
            <div class='router_uploader_inner'>
                <div class='absolute_full'>
                    <img class='absolute_full preview_img' src='${defaultImgSrc}'>
                </div>

                <div class='absolute_full align_center font_0 img_selector'>
                    <input class="input_upload absolute_full" type="file">
                    <span class='inline_block vertical_middle height_full'></span>
                    <i class="icon iconfont icon-fankui inline_block vertical_middle"></i>
                </div>
            </div>
        </div>`;
    return $(domStr);
}

class Uploader {
    constructor($upload, defaultImgSrc = DEFAULT_IMG_SRC) {
        if (!$upload) throw '请传入$upload容器';

        this.$upload = $upload.append(createUploaderBox(defaultImgSrc));

        this.upfile;

        this._initialize();
    }

    _initialize() {
        this._bindEvent();
    }

    _bindEvent() {
        var self = this;
        // input file change event
        this.$upload.find('.input_upload').on('change', function (e) {
            console.log('===== upload select file =====');

            var file = this.files[0];

            // 渲染预览图片
            tools.getBase64Img(file).then(base64Img => {
                self.setDefaultImg(base64Img);
            });

            // 重置upfile
            this.upfile = new UploadFile(file);
            console.log(this.upfile);




        });
    }

    // interface

    // 开始上传
    upload() {

    }

    // 设置上传底图
    setDefaultImg(src = DEFAULT_IMG_SRC) {
        this.$upload.find('.preview_img').attr('src', src);
    }
}

export default Uploader;

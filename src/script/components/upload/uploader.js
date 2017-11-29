import tools from '@/tools';
import UploadFile from './uploadFile';
import OssUploader from '@/script/components/upload/ossUpload';

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

                <div class='progress_shadow absolute_full font_0' style='background-color: rgba(0,0,0,0.5);display: none;'>
                    <div class='inline_block width_0 height_full vertical_middle'></div>
                    <div class='inline_block width_full vertical_middle'>
                        <p class='upload_status font_16' style='color: #fff;'>正在上传中...</p>
                        <div class='progress inline_block' style='width: 80%;height: 15px;margin-bottom: 0;margin-top: 5px;background-color: #717171;border-radius: 20px;'>
                            <div class='progress_inner transition_3' style='width: 0%;height: 100%;background-color: #fff;border-radius: 20px;'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    return $(domStr);
}

class Uploader {
    constructor($upload, defaultImgSrc = DEFAULT_IMG_SRC) {
        if (!$upload) throw '请传入$upload容器';

        this.$upload = $upload.append(createUploaderBox(defaultImgSrc));

        this._initialize();
    }

    _initialize() {
        this._bindEvent();
    }

    _bindEvent() {
        var self = this;
        // input file change event
        this.$upload.find('.input_upload').on('change', function(e) {
            console.log('===== upload select file =====');

            var file = this.files[0];

            // 渲染预览图片
            tools.getBase64Img(file).then(base64Img => {
                self.setDefaultImg(base64Img);
            });

            self.uploadFile = new UploadFile(file);
        });
    }

    _resetProgress() {
        this.$upload.find('.upload_status').text('正在上传中...');
        this.$upload.find('.progress_inner').css({
            width: '0%'
        });

        this.$upload.find('.input_upload').val('');
        this.uploadFile = void 0;
    }

    // interface

    // 开始上传
    upload() {
        var self = this;
        return new Promise((resolve, reject) => {
            if (!this.uploadFile) {
                resolve();
                throw '请选择上传文件···'
            } else {
                self.$upload.find('.progress_shadow').show();
                OssUploader.upload(self.uploadFile, function(percent) {
                    return function(done) {
                        console.log('正在上传中···');
                        console.log(percent);

                        self.$upload.find('.progress_inner').css({
                            width: percent * 100 + '%'
                        });

                        done();
                    }
                }).then(resp => {
                    console.log('图片上传成功，地址为；' + resp);

                    self.$upload.find('.upload_status').text('图片上传成功！');
                    setTimeout(function() {
                        self.$upload.find('.progress_shadow').hide();
                        self._resetProgress();

                        self.setDefaultImg(resp);
                        resolve(resp);
                    }, 500)
                });
            }
        });
    }

    getImgSrc() {
        return this.$upload.find('.preview_img').attr('src');
    }

    // 设置上传底图
    setDefaultImg(src) {
        this.$upload.find('.preview_img').attr('src', src || DEFAULT_IMG_SRC);
    }
}

export default Uploader;

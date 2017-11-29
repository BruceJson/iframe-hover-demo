import tools from '@/tools';

import api from '@/api'

import Dialog from '@/script/components/core/dialog.js';

import Uploader from '@/script/components/upload/uploader';

import baseData from '@/script/baseData/baseData';

// 创建弹出框模板
function createTemplate(navArr = []) {
    var template =
        `<div id='zfmodal3' class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
            <div class="modal-dialog matic_modal_dialog" role="document">
                <div class="modal-content ">
                    <div class="modal-header matic_header">
                        <!-- 叉叉 -->
                        <button type="button" class="close matic_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <!-- title -->
                        <h4 class="modal-title matic_modal_title" id="gridSystemModalLabel">单图设置</h4>

                    </div>
                    <div class="modal-body">
                        <div class="matic-mainBodyNav matic-linkNav" id="matic-lineNav" onmouseover="isOut=false" onmouseoout="isOut=true">
                            <div class="coverpic-box coverpic-box1 inline_block matic-mainBodyLeft upload_box">
                                <!-- uploader insert -->
                            </div>
                            <div class="matic-mainBodyRight2">
                                <p class="matic-linkP">链接地址</p>
                                <div>
                                    <input type="text" class="form-control adv_link" placeholder="请输入链接地址">
                                </div>
                            </div>
                            <div class="matic-msg align_left ly-top-12 ">图片大小不超过1M，仅支持jpg、png、gif格式图片</div>
                        </div>

                    </div>
                    <div class="modal-footer matic_modal_footer">
                        <button type="button" class="btn_confirm">保存</button>
                        <button type="button" class="btn_cancel" data-dismiss="modal">取消</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>`;

    return $(template);
}

var _resolve;

// 栏目设置弹窗
class AdvSettingDialog extends Dialog {
    constructor() {
        super();
        this._initialize();
    }

    _initialize() {
        this.$dialog = createTemplate();
        this._initUploader();
        this._bindEvent();
    }

    _initUploader() {
        this.advUploader = new Uploader(this.$dialog.find('.upload_box'));
    }

    // 绑定事件
    _bindEvent() {
        var self = this;
        // 确定按钮点击事件
        this.$dialog.on('click', '.btn_confirm', function() {
            self.advUploader.upload().then(url => {

                var guid = self.modelData.guid;
                var src = self.advUploader.getImgSrc();
                var link = self.$dialog.find('.adv_link').val();

                var advData = new baseData.AdvData(guid, src, link);
                console.log('adv dialog 确定')
                _resolve(advData);


                // 隐藏弹出框
                self._hideDialog();
            });
        });
    }

    // 设置链接数据框
    _setLink(modelData) {
        this.$dialog.find('.adv_link').val(modelData.link);
    }

    // @interface
    getDom() {
        return this.$dialog;
    }

    show(modelData, resolve) {
        _resolve = resolve;

        this._showDialog();
        this.modelData = modelData;

        // 设置uploader的图片
        this.advUploader.setDefaultImg(this.modelData.src);

        // 设置link
        this._setLink(modelData);
    }
}

export default AdvSettingDialog;

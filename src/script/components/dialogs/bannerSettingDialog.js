import tools from '@/tools';

import Dialog from './dialog.js';

import Uploader from '@/script/components/upload/uploader';

// 创建弹出框模板
function createTemplate() {
    // <!-- ========= 图片预览 ========= -->
    // <div id='img_preview_box' class="absolute_full">
    //     <img id='preview_img' class="absolute_full" src="/static/img/icon_3.png">
    // </div>
    // <!-- ========= 上传选择 ========= -->
    // <div id='img_upload_box' class="absolute_full">
    //     <input class="inp-upload" type="file">
    //     <span class="vertical_middle inline_block width_0 height_full"></span>
    //     <div class="vertical_middle inline_block">
    //         <i class="icon iconfont icon-fankui"></i>
    //     </div>
    // </div>
    var template =
        `<div id='zfmodal6' class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
            <div class="modal-dialog matic_modal_dialog" role="document">
                <div class="modal-content ">
                    <div class="modal-header matic_header">
                        <!-- 叉叉 -->
                        <button type="button" class="close matic_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <!-- title -->
                        <h4 class="modal-title matic_modal_title" id="gridSystemModalLabel">顶图设置</h4>
                    </div>
                    <div class="modal-body">
                        <div class="matic-mainBodyNav matic-linkNav" id="matic-lineNav" onmouseover="isOut=false" onmouseoout="isOut=true">
                            <div class="banner_upload_box coverpic-box coverpic-box3 inline_block matic-middlePicture">
                                <!-- ========= 上传插件 insert ========= -->
                            </div>
                            <div class="matic-msg1"> 建议上传宽高为1920*600像素的图片，图片大小不超过2M，仅支持jpg、png、gif格式图片</div>
                        </div>
                    </div>
                    <div class="modal-footer matic_modal_footer">
                        <button type="button" class="btn_confirm">保存</button>
                        <button type="button" class="btn_cancel" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>`;

    return $(template);
}

var _resolve;

// 栏目设置弹窗
class BannerSettingDialog extends Dialog {

    /**
     * @param {BannerData} modelData
     */
    constructor() {
        super();
        this._initialize();
    }

    _initialize() {
        // 初始化dom
        this.$dialog = createTemplate();
        // 初始化上传插件
        this._initUploader();
        // 绑定事件
        this._bindEvent();
    }

    _initUploader() {
        this.bannerUploader = new Uploader(this.$dialog.find('.banner_upload_box'));
    }

    _renderBanner() {
        this.$dialog.find('#preview_img').attr('src', this.modelData && this.modelData.src || '');
    }

    _bindEvent() {
        this.$dialog.find('.btn_confirm').click(function() {
            _resolve('banner dialog 确定');
        });
    }

    // @interface
    getDom() {
        return this.$dialog;
    }

    show(modelData, resolve) {
        // 显示dialog
        this._showDialog();

        // 替换元数据
        this.modelData = modelData;

        // 渲染banner
        this._renderBanner();

        _resolve = resolve;
    }

}

export default BannerSettingDialog;

import tools from '@/tools';

import Dialog from './dialog.js';

// 创建弹出框模板
/**
 * navArr => [{
 *     title: '***',
 *     jumpLink: '***'
 * }]
 */
createTemplate(navArr = []) {
    var template =
        `<!--顶图设置  -->
        <div id='zfmodal6' class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
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
                            <div class="coverpic-box coverpic-box3 inline_block matic-middlePicture">
                                <input class="inp-upload" type="file">
                                <span class="vertical_middle inline_block width_0 height_full"></span>
                                <div class="vertical_middle inline_block">
                                    <i class="icon iconfont icon-fankui"></i>
                                </div>
                            </div>
                            <div class="matic-msg1"> 建议上传宽高为1920*600像素的图片，图片大小不超过2M，仅支持jpg、png、gif格式图片</div>
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

// 栏目设置弹窗
class NavSettingDialog extends Dialog {

    /**
     * {object} modelObj
     * modelObj => {
     *     navArr: [{
     *          title: '***',
     *          jumpLink: '***'
     *     },...],
     *     
     * }
     */
    constructor(modelObj) {
        super(modelObj);
        this.initialize();
        this.renderLinkList();
    }

    initialize() {
        this.$dialog = createTemplate(this.modelObj.navArr);
        this.$linkListBox = this.$dialog.find('#matic-link-box');
    }

    async renderLinkList() {
        // 获取链接列表
        var linkList = await getLinkList();
        // 根据链接列表渲染列表
        var $linkListTemplate = createColumnLinkListTemplate(linkList);
        // 清空列表
        this.$linkListBox.children().remove();
        // 渲染linkList
        this.$linkListBox.append($linkListTemplate);
    }

    // 获取栏目链接列表
    getLinkList() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    getDom() {
        return this.$dialog;
    }
}

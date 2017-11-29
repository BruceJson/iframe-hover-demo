import tools from '@/tools';

import api from '@/api'

import Dialog from '@/script/components/core/dialog.js';

import baseData from '@/script/baseData/baseData';

// 创建弹出框模板
function createTemplate(navArr = []) {
    var template =
        `<div id='zfmodal2' class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
            <div class="modal-dialog matic_modal_dialog" role="document">
                <div class="modal-content ">
                    <div class="modal-header matic_header">
                        <!-- 叉叉 -->
                        <button type="button" class="close matic_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <!-- title -->
                        <h4 class="modal-title matic_modal_title" id="gridSystemModalLabel">焦点图设置</h4>

                    </div>
                    <div class="modal-body">
                        <div class="matic-mainBodyNav matic-linkNav" id="matic-lineNav" onmouseover="isOut=false" onmouseoout="isOut=true">
                            <div class="matic-foucsImage">
                                <div class="replayHeaderFirstList1 matic-foucsImage1">名称</div>
                                <div class="replayHeaderFirstList2 matic-foucsImage2">
                                    <input class='focus_name' style='border: none;' placeholder='请输出名称'>
                                </div>
                            </div>
                            <div class="matic-foucsImage">
                                <div class="replayHeaderFirstList1 matic-foucsImage1">类型</div>
                                <div class="replayHeaderFirstList2 matic-foucsImage2" style="width:200px;">
                                    <select class="form-control focus_type_select">
                                        <option value="article">图文</option>
                                        <option value="images">图集</option>
                                        <option value="video">视频</option>
                                    </select>
                                </div>
                            </div>
                            <div class="matic-foucsImage">
                                <div class="replayHeaderFirstList1 matic-foucsImage1">显示数量</div>
                                <div class="replayHeaderFirstList2 matic-foucsImage2">
                                    <input class='focus_count' type='text' style='border: none;' placeholder='请输入显示数量'>
                                </div>
                            </div>

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
class FocusSettingDialog extends Dialog {
    constructor() {
        super();
        this._initialize();
    }

    _initialize() {
        this.$dialog = createTemplate();

        this._bindEvent();
    }

    _initFocusDialog(focusData) {
        // 初始化title
        this.$dialog.find('.focus_name').val(focusData.title);

        // 初始化类型
        this.$dialog.find('.focus_type_select').val(focusData.focusType);

        // 初始化数量
        this.$dialog.find('.focus_count').val(focusData.count);
    }

    // 绑定事件
    _bindEvent() {
        var self = this;

        // 确定按钮点击事件
        this.$dialog.on('click', '.btn_confirm', function() {

            var guid = self.modelData.guid;
            var title = self.$dialog.find('.focus_name').val();
            var focusType = self.$dialog.find('.focus_type_select').val();
            var count = self.$dialog.find('.focus_count').val();

            var focusData = new baseData.FocusData(guid, title, focusType, count);

            console.log('focus dialog 确定按钮点击');
            self._hideDialog();
            _resolve(focusData);
        });
    }

    // @interface
    getDom() {
        return this.$dialog;
    }

    show(modelData, resolve) {
        _resolve = resolve;

        // 显示dialog
        this._showDialog();

        // 绑定modelData
        this.modelData = modelData;

        // 初始化弹出框
        this._initFocusDialog(this.modelData);
    }
}

export default FocusSettingDialog;

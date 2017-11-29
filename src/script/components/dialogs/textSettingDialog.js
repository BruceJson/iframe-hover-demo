import tools from '@/tools';

import api from '@/api'

import Dialog from '@/script/components/core/dialog.js';

import global from '@/global';

import baseData from '@/script/baseData/baseData';
// 创建弹出框模板
function createTemplate(navArr = []) {
    var template =
        `<div id='zfmodal7' class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
        <div class="modal-dialog matic_modal_dialog" role="document">
            <div class="modal-content ">
                <div class="modal-header matic_header">
                    <!-- 叉叉 -->
                    <button type="button" class="close matic_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <!-- title -->
                    <h4 class="modal-title matic_modal_title" id="gridSystemModalLabel">栏目设置</h4>

                </div>
                <div class="modal-body">
                    <div class="matic-mainBodyNav matic-linkNav" id="matic-lineNav" onmouseover="isOut=false" onmouseoout="isOut=true">
                        <!-- ============= 编辑器 insert ============= -->
                        <div id='text_dialog_ueditor' class='editor_box' style='height: 350px;'></div>
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

var editorConfig = {
    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
    // toolbars: [],
    // 禁用服务器服务
    serverUrl: false,
    //focus时自动清空初始化时的内容
    autoClearinitialContent: true,
    //关闭字数统计
    wordCount: false,
    //关闭elementPath
    elementPathEnabled: false,
    //默认的编辑区域高度
    // initialFrameHeight:300
    // 是否自动长高
    autoHeightEnabled: true,
    // 初始化成功插件后自动添加焦点
    // focus: true,
    // 不允许自动保存
    enableAutoSave: false,
    // 是否自动同步数据
    autoSyncData: false,
    // 使用纯文本粘贴
    pasteplain: false,

    // 是否开启自动上传
    autoUpload: false,

    // 是否只读
    // readonly: true,
    // 是否打开右键菜单功能
    enableContextMenu: false,
    maxInputCount: -1,
    focus: true,
    zIndex: 200,
    // initialContent : ''
};

// 栏目设置弹窗
class ColumnSettingDialog extends Dialog {
    constructor() {
        super();
        this._initialize();
    }

    _initialize() {
        this.$dialog = createTemplate();

        this._bindEvent();
    }

    // 初始化编辑器
    _initEditor() {
        this.ue = window.UE.getEditor('text_dialog_ueditor', editorConfig);
    }

    // 初始化编辑器内容
    _initTextDialog() {
        this.ue.setContent(this.modelData.value);
        this.ue.focus();
    }

    // 绑定事件
    _bindEvent() {
        var self = this;

        this.$dialog.on('shown.bs.modal', function() {
            if (!this.ue) {
                self._initEditor();
                self.ue.ready(function() {
                    self._initTextDialog();
                })
            } else {
                self._initTextDialog();
            }
        });

        // 确定按钮点击事件
        this.$dialog.on('click', '.btn_confirm', function() {

            var value = self.ue.getContent();

            var guid = self.modelData.guid;

            var textData = new baseData.TextData(guid, value);

            console.log('text dialog 确定按钮点击');
            self._hideDialog();
            _resolve(textData);
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
    }
}

export default ColumnSettingDialog;

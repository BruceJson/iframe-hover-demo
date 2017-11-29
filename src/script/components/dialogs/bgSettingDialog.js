import tools from '@/tools';

import api from '@/api'

import Dialog from '@/script/components/core/dialog.js';

import Uploader from '@/script/components/upload/uploader';

import global from '@/global';

import '@static/js/colorPicker/js/colorpicker';

import baseData from '@/script/baseData/baseData';
// 创建弹出框模板
function createTemplate(navArr = []) {
    var template =
        `<div id='zfmodal5' class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
	        <div class="modal-dialog matic_modal_dialog" role="document">
	            <div class="modal-content ">
	                <div class="modal-header matic_header">
	                    <!-- 叉叉 -->
	                    <button type="button" class="close matic_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	                    <!-- title -->
	                    <h4 class="modal-title matic_modal_title" id="gridSystemModalLabel">背景设置</h4>
	                </div>
	                <div class="modal-body">
	                    <div class="matic-mainBodyNav matic-linkNav" id="matic-lineNav" onmouseover="isOut=false" onmouseoout="isOut=true">
	                        <div class="matic-topTitle">
	                            <div class="btn_tab matic-backgroundSet cursor active" type='image'>自定义背景</div>
	                            <div class="btn_tab matic-fontSiseSet cursor" type='color'>自定义颜色</div>
	                        </div>
	                        <!-- 自定义背景 -->
	                        <div class="matic-mainBodyBg" style="display:block;">
	                            <div class="uploader_box coverpic-box coverpic-box2 inline_block matic-mainBodyLeft  vertical_top">
	                                <!-- uploader insert -->

	                            </div>
	                            <div class="matic-mainBodyRight row">
	                                <div class="col-xs-5">
	                                    <div class="align_left matic_color_title margin_bottom_10 ">展示方式</div>
	                                    <!-- ================== 展示方式 ================= -->
	                                    <div>
	                                        <div style="display:inline-block;position:relative;">
	                                            <img src="/static/img/6_03.png" alt="" style="width:100px">
	                                            <div class="checkbox-custom fill checkbox-success checkbox-success1 mb5 margin_top_15 align_left">
	                                                <input type="radio" name="bgCoverType" id="headerSkin3" value="cover">
	                                                <label for="headerSkin3" class="triangle-topright"></label>
	                                            </div>
	                                            <div class="align_center matic_color_title margin_top_10 ">平铺</div>
	                                        </div>
	                                        <div style="display:inline-block;position:relative;margin-left:5px;">
	                                            <img src="/static/img/6_05.png" alt="" style="width:100px">
	                                            <div class="checkbox-custom fill checkbox-success checkbox-success1 mb5 margin_top_15 align_left">
	                                                <input type="radio" name="bgCoverType" id="headerSkin4" value="inherit">
	                                                <label for="headerSkin4" class="triangle-topright"></label>
	                                            </div>

	                                            <div class="align_center matic_color_title margin_top_10 ">锁定</div>
	                                        </div>
	                                        <div style="width:1px ;height:100px;vertical-align:middle;background:#ececec;float:right;"></div>
	                                    </div>

	                                </div>

	                                <div class="col-xs-7">
	                                    <div class="align_left matic_color_title margin_bottom_10">对齐方式</div>
	                                    <!-- ================== 对齐方式 ================= -->
	                                    <div>
	                                        <div style="display:inline-block;position:relative;">
	                                            <img src="/static/img/6_07.png" alt="" style="width:100px">
	                                            <div class="checkbox-custom fill checkbox-success checkbox-success1 mb5 margin_top_15 align_left">
	                                                <input type="radio" name="bgPosition" id="headerSkin5" value="center">
	                                                <label for="headerSkin5" class="triangle-topright"></label>
	                                            </div>
	                                            <div class="align_center matic_color_title margin_top_10 ">居中</div>
	                                        </div>
	                                        <div style="display:inline-block;position:relative;margin-left:5px;">
	                                            <img src="/static/img/6_09.png" alt="" style="width:100px">
	                                            <div class="checkbox-custom fill checkbox-success checkbox-success1 mb5 margin_top_15 align_left">
	                                                <input type="radio" name="bgPosition" id="headerSkin6" value="left">
	                                                <label for="headerSkin6" class="triangle-topright"></label>
	                                            </div>
	                                            <div class="align_center matic_color_title margin_top_10 ">居左对齐</div>
	                                        </div>
	                                        <div style="display:inline-block;position:relative;margin-left:5px;">
	                                            <img src="/static/img/6_11.png" alt="" style="width:100px">
	                                            <div class="checkbox-custom fill checkbox-success checkbox-success1 mb5 margin_top_15 align_left">
	                                                <input type="radio" name="bgPosition" id="headerSkin7" value="right">
	                                                <label for="headerSkin7" class="triangle-topright"></label>
	                                            </div>
	                                            <div class="align_center matic_color_title margin_top_10 ">居右对齐</div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>


	                        </div>
	                        <!-- 自定义颜色 -->
	                        <div class="matic-manBodyColor align_center" style="display:none;">
	                        	<div class='colorPicker_box inline_block'></div>
	                            <!-- 内容 -->
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
class BgSettingDialog extends Dialog {
    constructor() {
        super();
        this._initialize();
    }

    _initialize() {
        this.$dialog = createTemplate();
        this._initUploader();
        this._initColorPicker();
        this._bindEvent();
    }

    _initUploader() {
        this.bgUploader = new Uploader(this.$dialog.find('.uploader_box'));
    }

    _initColorPicker() {
        this.$dialog.find('.colorPicker_box').ColorPicker({ flat: true });
    }

    // 初始化编辑器内容
    _initBgDialog(bgData) {
        // 背景类型
        this._setTab(bgData.bgType);
        // 背景颜色
        this.$dialog.find('.colorPicker_box').ColorPickerSetColor(bgData.bgColor);
        // 背景图
        this.bgUploader.setDefaultImg(bgData.bgSrc);
        // 背景展示方式
        this.$dialog.find('input[name=bgCoverType][value=' + bgData.bgCoverType + ']').prop('checked', true);
        // 背景对齐方式
        this.$dialog.find('input[name=bgPosition][value=' + bgData.bgPosition + ']').prop('checked', true);
    }

    _setTab(type) {
        var $tab = this.$dialog.find('.btn_tab[type=' + type + ']');
        $tab.siblings().removeClass('active');
        $tab.addClass('active');
        if (type === 'image') {
            this.$dialog.find('.matic-mainBodyBg').show();
            this.$dialog.find('.matic-manBodyColor').hide();
        } else {
            this.$dialog.find('.matic-mainBodyBg').hide();
            this.$dialog.find('.matic-manBodyColor').show();
        }
    }

    // 绑定事件
    _bindEvent() {
        var self = this;
        // tab切换按钮点击事件
        this.$dialog.on('click', '.btn_tab', function() {
            var type = this.getAttribute('type');
            self._setTab(type);
        });


        // 确定按钮点击事件
        this.$dialog.on('click', '.btn_confirm', function() {
            // bgType = 'image', bgSrc = '', bgCoverType = 'cover', bgPosition = 'center', bgColor = '#ffffff'
            var bgType = $('.btn_tab.active').attr('type');
            var bgSrc;
            var bgCoverType;
            var bgPosition;
            var bgColor;

            if (bgType === 'image') {
                self.bgUploader.upload().then(function() {
                    bgSrc = self.bgUploader.getImgSrc();
                    bgCoverType = self.$dialog.find('input:checked[type=radio][name=bgCoverType]').val();
                    bgPosition = self.$dialog.find('input:checked[type=radio][name=bgPositione]').val();
                    bgColor = '#ffffff';

                    var bgData = new baseData.BgData(bgType, bgSrc, bgCoverType, bgPosition, bgColor);

                    console.log('text dialog 确定按钮点击');
                    self._hideDialog();
                    _resolve(bgData);
                });

            } else if (bgType === 'color') {
                bgSrc = '';
                bgCoverType = 'cover';
                bgPosition = 'center';
                bgColor = '#' + self.$dialog.find('.colorPicker_box').ColorPickerGetColor();

                var bgData = new baseData.BgData(bgType, bgSrc, bgCoverType, bgPosition, bgColor);

                console.log('text dialog 确定按钮点击');
                self._hideDialog();
                _resolve(bgData);

            }


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

        this._initBgDialog(this.modelData);
    }
}

export default BgSettingDialog;

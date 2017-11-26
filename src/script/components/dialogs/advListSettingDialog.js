import tools from '@/tools';

import api from '@/api'

import Dialog from './dialog.js';

import Uploader from '@/script/components/upload/uploader';

// 创建弹出框模板
function createTemplate(navArr = []) {
    var template =
        `<div id='zfmodal4' class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
	        <div class="modal-dialog matic_modal_dialog" role="document">
	            <div class="modal-content ">
	                <div class="modal-header matic_header">
	                    <!-- 叉叉 -->
	                    <button type="button" class="close matic_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	                    <!-- title -->
	                    <h4 class="modal-title matic_modal_title" id="gridSystemModalLabel">友情链接</h4>

	                </div>
	                <div class="modal-body">
	                    <div class="matic-mainBodyNav matic-linkNav" id="matic-lineNav" onmouseover="isOut=false" onmouseoout="isOut=true">
	                        <div class="panel-body no_padding">
	                            <table class="table">
	                                <thead>
	                                    <tr>
	                                        <th width="20%" class="matic_modal_th">标题</th>
	                                        <th width="15%" class="matic_modal_th">名称</th>
	                                        <th width="50%" class="matic_modal_th">链接地址</th>
	                                        <th width="15%" class=" matic_modal_th border-rightNone">操作</th>
	                                    </tr>
	                                </thead>
	                                <tbody class='adv_list'>
	                                  	<!-- ================= advList insert ================= -->
	                                    <tr class='add_adv_area'>
	                                        <td colspan="5" class="align_center cursor">
	                                            <i class="icon iconfont icon-tianjia matic-addIcon"></i>
	                                            <span class="matic-add">添加</span>
	                                        </td>
	                                    </tr>
	                                </tbody>
	                            </table>
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

function createAdvItemTemplate(adv = {}) {
    var advItemTemplate =
        `<tr class='adv_item'>
            <td class="font_14 align_center matic_modal_td">
                <div class="coverpic-box inline_block upload_box">
                 	<!-- ============= uploader insert ============= -->
                </div>
            </td>
            <td class="font_14 align_center  matic_modal_td">
            	<input class="font_14 matic-nav-spanSpecial adv_name" placeholder='请输入名称' value="${adv.name || ''}">
            </td>
            <td class="font_14 align_center  matic_modal_td">
                <input class="font_14 matic-nav-spanSpecial adv_link" placeholder='请输入链接地址' value="${adv.link || ''}">
            </td>

            <td class="align_center">
                <div>
                    <ul>
                        <li>
                            <a class="operate-delete-btn btn_delete">
                                <i class="icon iconfont icon-zititubiao2huishouzhan1 font_25 vertical_middle"></i>
                                <span class="font_16 vertical_middle">删除</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </td>
        </tr>`;

    return advItemTemplate;
}

var _resolve;

// 栏目设置弹窗
class AdvListSettingDialog extends Dialog {
    constructor() {
        super();
        this._initialize();
    }

    _initialize() {
        this.$dialog = createTemplate();
        this.$advList = this.$dialog.find('.adv_list');
        this.$addBtn = this.$dialog.find('.add_adv_area');

        this._bindEvent();
    }

    _initAdvList(advListData) {
        // 清空列表
        this.$advList.find('.adv_item').remove();

        // 渲染列表
        for (var i = 0; i < advListData.advList.length; i++) {
            var advData = advListData.advList[i];

            // 生成列表模板
            var advTmpl = createAdvItemTemplate(advData);

            // 生成广告列表项
            var $advItem = $(advTmpl);

            // 创建uploader
            var uploader = new Uploader($advItem.find('.upload_box'));

            // 设置uploader图片
            uploader.setDefaultImg(advData.src);

            // 绑定uploader至dom
            $advItem.data('uploader', uploader);

            // 将列表项插入到列表中
            this.$advList[0].insertBefore($advItem[0], this.$addBtn[0]);
        }
    }

    // 绑定事件
    _bindEvent() {
        var self = this;
        // 添加按钮点击事件
        this.$addBtn.on('click', function() {
            // 获取广告列表项模板
            var advItemTmpl = createAdvItemTemplate();

            // 创建广告列表
            var $advItem = $(advItemTmpl);

            // 将uploader和dom绑定
            $advItem.data('uploader', new Uploader($advItem.find('.upload_box')));

            // 在广告列表前面添加空白项
            self.$advList[0].insertBefore($advItem[0], self.$addBtn[0]);
        });

        // 确定按钮点击事件
        this.$dialog.on('click', '.btn_confirm', function() {
            self._hideDialog();
            _resolve('adv dialog 确定按钮点击');
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

        // 初始化广告列表
        this._initAdvList(this.modelData);
    }
}

export default AdvListSettingDialog;

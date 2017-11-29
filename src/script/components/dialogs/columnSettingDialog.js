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
                        <div class="column-replayHead">
                            <div class="replayHeadFirst">
                                <div class="replayHeaderFirstList1">栏目类型</div>
                                <div class="replayHeaderFirstList2 column_type">图文</div>
                            </div>
                            <div class="replayHeadFirst">
                                <div class="replayHeaderFirstList1">栏目名称</div>
                                <div class="replayHeaderFirstList2" style="width:200px;">
                                    <input type="text" class="form-control matic-specialColor column_title" placeholder="新闻资讯">
                                </div>
                            </div>
                            <div class="replayHeadFirst">
                                <div class="replayHeaderFirstList1">聚合方式</div>
                                <div class="replayHeaderFirstList2" style="width:200px;">
                                    <select class='column_tag_type' id="" class="form-control">
                                        <option value="in">满足任意关联标签</option>
                                        <option value="all">满足所有关联标签</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="column-replayInner">
                            <div class="column-replayInnerTitle">关联标签</div>
                            <div class="column-replayInnerContent tag_list">
                                <!-- ============== tagList insert ============= -->
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

function createItem(tag) {
    var item =
        `<div class="checkbox-custom fill checkbox-warning checkbox-inline" style='padding-right: 10px'>
            <input type="checkbox" id="${tag.id}">
            <label for="${tag.id}">${tag.name}</label>
        </div>`;

    return item;
}

var _resolve;

// 栏目设置弹窗
class ColumnSettingDialog extends Dialog {
    constructor() {
        super();
        this._initialize();
    }

    _initialize() {
        this.$dialog = createTemplate();

        this._initTagList();

        this._bindEvent();
    }

    // 初始化标签列表
    async _initTagList() {
        var self = this;
        api.getTagList().then((resp) => {
            console.log('获取标签列表成功····');
            console.log(resp);

            var tagList = resp.list || [];

            self._renderTagList(tagList);
        });
    }

    _renderTagList(tagList) {
        // 清空列表
        this.$dialog.find('.tag_list').children().remove();

        // 渲染列表
        for (var i = 0; i < tagList.length; i++) {
            var item = createItem(tagList[i]);

            var $item = $(item);

            this.$dialog.find('.tag_list').append($item);
        }
    }

    _initColumnDialog(columnData) {
        this.$dialog.find('.column_type').text(columnData.type === 'article' ? '图文' : columnData.type === 'images' ? '图集' : '视频');
        this.$dialog.find('.column_title').val(columnData.title);
        this.$dialog.find('.column_tag_type').val(columnData.groupType);

        var ids = columnData.tagIds === '' ? [] : columnData.tagIds.split(',');

        // 先取消checkbox选中
        this.$dialog.find('.tag_list').find('input[type=checkbox]').prop('checked', false);
        // 让tagIds对应的ids选中
        for (var i = 0; i < ids.length; i++) {
            this.$dialog.find('.tag_list').find('#' + ids[i]).prop('checked', true);
        }
    }

    // 绑定事件
    _bindEvent() {
        var self = this;

        // 确定按钮点击事件
        // guid = '', type = '', title = '', groupType = 'in', tagIds = ''
        this.$dialog.on('click', '.btn_confirm', function() {

            var guid = self.modelData.guid;

            var type = self.modelData.type;

            var title = self.$dialog.find('.column_title').val();

            var groupType = self.$dialog.find('.column_tag_type').val();

            var tagIds = self.$dialog.find('.tag_list').find('input:checked[type=checkbox]').map(function() {
                return this.id;
            }).toArray().join(',');

            var columnListData = new baseData.ColumnListData(guid, type, title, groupType, tagIds);

            console.log('column dialog 确定按钮点击');
            self._hideDialog();
            _resolve(columnListData);
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
        this._initColumnDialog(this.modelData);
    }
}

export default ColumnSettingDialog;

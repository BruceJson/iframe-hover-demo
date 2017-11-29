import tools from '@/tools';

import api from '@/api'

import Dialog from '@/script/components/core/dialog.js';

import Uploader from '@/script/components/upload/uploader';

import baseData from '@/script/baseData/baseData';
// 创建弹出框模板
function createTemplate(navArr = []) {
    var template =
        `<div id='zfmodal1' class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
            <div class="modal-dialog matic_modal_dialog" role="document">
                <div class="modal-content ">
                    <div class="modal-header matic_header">
                        <!-- 叉叉 -->
                        <button type="button" class="close matic_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <!-- title -->
                        <h4 class="modal-title matic_modal_title" id="gridSystemModalLabel">轮播设置</h4>

                    </div>
                    <div class="modal-body">
                        <div class="matic-mainBodyNav matic-linkNav" id="matic-lineNav" onmouseover="isOut=false" onmouseoout="isOut=true">
                            <div class="panel-body no_padding">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th width="20%" class="matic_modal_th">标题</th>
                                            <th width="50%" class="matic_modal_th">链接地址</th>
                                            <th width="15%" class="matic_modal_th">排序</th>
                                            <th width="15%" class=" matic_modal_th border-rightNone">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody class='swiper_list'>
                                        <!-- =============== swiper列表 insert ============== -->
                                        <tr class='add_swiper_area' id='swiper_add_item'>
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

function createItemTemplate(swiper = {}) {
    var itemTemplate =
        `<tr class='swiper_item'>
            <td class="font_14 align_center matic_modal_td">
                <div class="coverpic-box inline_block upload_box">
                    <!-- ============= uploader ============= -->
                </div>
            </td>
            <td class="font_14 align_center  matic_modal_td">
                <input class="font_14 matic-nav-spanSpecial swiper_link" placeholder='请输入名称' value="${swiper.link || ''}">
            </td>
            <td class="align_center font_14  matic_modal_td">
                <i class="icon iconfont icon-jiantou1 btn_up" style="color:#c7c7c7;font-size:30px;"></i>
                <i class="icon iconfont icon-jiantou1-copy btn_down" style="color:#1bc1ff;font-size:30px;"></i>
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

    return itemTemplate;
}

var _resolve;

// 栏目设置弹窗
class SwiperSettingDialog extends Dialog {
    constructor() {
        super();
        this._initialize();
    }

    _initialize() {
        this.$dialog = createTemplate();
        this.$swiperList = this.$dialog.find('.swiper_list');
        this.$addBtn = this.$dialog.find('.add_swiper_area');

        this._bindEvent();
    }

    _initSwiperList(swiperListData) {
        // 清空列表
        this.$swiperList.find('.swiper_item').remove();

        // 渲染列表
        for (var i = 0; i < swiperListData.swiperItemList.length; i++) {
            var swiperData = swiperListData.swiperItemList[i];

            // 生成列表模板
            var swiperTmpl = createItemTemplate(swiperData);

            // 生成广告列表项
            var $swiperItem = $(swiperTmpl);

            // 创建uploader
            var uploader = new Uploader($swiperItem.find('.upload_box'));

            // 设置uploader图片
            uploader.setDefaultImg(swiperData.src);

            // 绑定uploader至dom
            $swiperItem.data('uploader', uploader);

            // 将列表项插入到列表中
            this.$swiperList[0].insertBefore($swiperItem[0], this.$addBtn[0]);
        }
    }

    // 绑定事件
    _bindEvent() {
        var self = this;
        // 上按钮点击事件
        this.$dialog.on('click', '.btn_up', function() {
            var list = self.$swiperList.get(0);

            var item = $(this).parents('.swiper_item').get(0);

            var pre_item = item.previousSibling;

            if (pre_item) {
                list.insertBefore(item, pre_item);
            }

        });

        // 下按钮点击事件
        this.$dialog.on('click', '.btn_down', function() {
            var list = self.$swiperList.get(0);

            var item = $(this).parents('.swiper_item').get(0);

            var next_item = item.nextSibling;

            if (next_item && next_item.id !== 'swiper_add_item') {
                list.insertBefore(next_item, item);
            }
        });

        // 删除按钮点击事件
        this.$dialog.on('click', '.btn_delete', function() {
            $(this).parents('.swiper_item').eq(0).remove();
        });

        // 添加按钮点击事件
        this.$addBtn.on('click', function() {
            // 获取广告列表项模板
            var swiperTmpl = createItemTemplate();

            // 创建广告列表
            var $swiperItem = $(swiperTmpl);

            // 将uploader和dom绑定
            $swiperItem.data('uploader', new Uploader($swiperItem.find('.upload_box')));

            // 在广告列表前面添加空白项
            self.$swiperList[0].insertBefore($swiperItem[0], self.$addBtn[0]);
        });

        // 确定按钮点击事件
        this.$dialog.on('click', '.btn_confirm', function() {
            // 取出所有uploader
            var uploaderArr = [];
            self.$dialog.find('.swiper_item').each(function() {
                var uploader = $(this).data('uploader');
                uploaderArr.push(uploader);
            });

            self._upload(uploaderArr, 0, function() {
                // 全部上传成功回调

                var swiperItemList = [];

                self.$dialog.find('.swiper_item').each(function() {
                    var uploader = $(this).data('uploader');

                    // src link
                    var src = uploader.getImgSrc();

                    var link = $(this).find('.swiper_link').val();

                    var swiperItemData = new baseData.SwiperItemData(src, link);

                    swiperItemList.push(swiperItemData);
                });

                // guid = '', swiperItemList = []

                var guid = self.modelData.guid;
                var swiperItemList = swiperItemList;

                var swiperData = new baseData.SwiperData(guid, swiperItemList);

                console.log('swiper dialog 确定按钮点击');

                self._hideDialog();
                _resolve(swiperData);

            });

        });
    }

    _upload(uploaderArr, index, callback) {
        var self = this;
        var index = index;
        if (index >= uploaderArr.length) {
            // 如果最后一张已经上传结束
            callback();
            return;
        }
        uploaderArr[index].upload().then(resp => {
            index++;
            self._upload(uploaderArr, index, callback)
        })
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
        this._initSwiperList(this.modelData);
    }
}

export default SwiperSettingDialog;

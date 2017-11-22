import tools from '@/tools';

import Dialog from './dialog.js';


// 创建栏目链接列表模板
/**
 * linkArr => [{
 *     title: '***',
 *     jumpLink: '***'
 * }]
 */
function createColumnLinkListTemplate(linkArr = []) {
    var template = !linkArr || linkArr.length === 0 ?
        '<p>对不起，暂无栏目链接</p>' :
        `<table style="width:100%">
            <thead>
                <tr>
                    <th class="matic-link-list bold" width="20%">栏目名</th>
                    <th class="matic-link-list bold" width="80%">链接地址</th>
                </tr>
            </thead>
            <tbody>
                ${
                    linkArr.map(linkObj => `<tr>
                                <td class="matic-link-list">${linkObj.title || ''}</td>
                                <td class="matic-link-list">${linkObj.jumpLink || ''}</td>
                            </tr>`
                    ).join('')
                }
            </tbody>
        </table>`;

    return $(template);
}

// 创建弹出框模板
/**
 * navArr => [{
 *     title: '***',
 *     jumpLink: '***'
 * }]
 */
function createTemplate(navArr = []) {
    var template =
        `<div id='zfmodal' class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
            <div class="modal-dialog matic_modal_dialog" role="document">
                <div class="modal-content ">
                    <div class="modal-header matic_header">
                        <!-- 叉叉 -->
                        <button type="button" class="close matic_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <div class="matic-lineDetail">
                            <i class="icon iconfont icon-wenhao1 vertical-middle margin-right-5"></i>
                            <span class="matic-lookDetail">查看栏目链接</span>    
                            <div class="matic-linkAll">
                                <div class="triangle-up"></div>
                                <div id="matic-link-box" class="matic-link">
                                    <!-- ======== 栏目链接列表 insert ======== -->
                                </div>
                            </div>
                        </div>
                        <!-- title -->
                        <h4 class="modal-title matic_modal_title" id="gridSystemModalLabel">导航设置</h4>
    
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
                                    <tbody>
                                        ${
                                            navArr.map(nav => `<tr>
                                                    <td class="font_14 align_center matic_modal_td">
                                                        <input class="font_14 matic-nav-spanSpecial" placeholder='请输入标题' value="${nav.title || ''}">
                                                    </td>
                                                    <td class="font_14 align_center  matic_modal_td">
                                                        <input class="matic-nav-spanSpecial" placeholder='请输入网址' value="${nav.jumpLink || ''}">
                                                    </td>
                                                    <td class="align_center font_14  matic_modal_td">
                                                        <!-- 上 -->
                                                        <i class="icon iconfont icon-jiantou1" style="color:#c7c7c7;font-size:30px;"></i>
                                                        <!-- 下 -->
                                                        <i class="icon iconfont icon-jiantou1-copy" style="color:#1bc1ff;font-size:30px;"></i>
                                                    </td>
                                                    <td class="align_center">
                                                        <div>
                                                            <ul>
                                                                <li>
                                                                    <a href="#" class="operate-delete-btn">
                                                                        <i class="icon iconfont icon-zititubiao2huishouzhan1 font_25 vertical_middle"></i>
                                                                        <span class="font_16 vertical_middle">删除</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>`
                                            ).join('')
                                        }
                                        <tr>
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
            </div>
        </div>`;

    return $(template);
}

// 栏目设置弹窗
class NavSettingDialog extends Dialog {
    constructor(modelData) {
        super(modelData);
        this._initialize();
        this._renderLinkList();
        this._bindEvent();
    }

    _initialize() {
        // this.$dialog = createTemplate(this.modelData.navItemList);
        this.$dialog = createTemplate([{
            title: 'aaa',
            link: 'http:www.baidu.com'
        },{
            title: 'bbb',
            link: 'http:www.baidu.com'
        },{
            title: 'ccc',
            link: 'http:www.baidu.com'
        }]);
        this.$linkListBox = this.$dialog.find('#matic-link-box');
    }

    _bindEvent(){
        
    }

    async _renderLinkList() {
        // 获取链接列表
        var linkList = await this._getLinkList();
        // 根据链接列表渲染列表
        var $linkListTemplate = createColumnLinkListTemplate(linkList);
        // 清空列表
        this.$linkListBox.children().remove();
        // 渲染linkList
        this.$linkListBox.append($linkListTemplate);
    }

    // 获取栏目链接列表
    _getLinkList(){
        return new Promise((resolve,reject) => {
            resolve();
        });
    }

    getDom(){
        return this.$dialog;
    }
}

export default NavSettingDialog;

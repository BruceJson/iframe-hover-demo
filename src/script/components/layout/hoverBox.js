import dialogManager from '@/script/components/dialogs/dialogManager';

import tools from '@/tools'

var $iframe = $('#iframe');

var iframeWindow = $iframe[0].contentWindow;

var iframeOrigin = $iframe[0].src;

// 创建SelectItem
/**
 * {object} modelPositionObj
 * modelPositionObj.type 模块类型 banner/navbar/focus_box/article/swiper/adv/image_list/text/video_list/adv_list
 * modelPositionObj.movable 是否可以上下移动 boolean
 */
function createSelectItem(modelPositionObj) {
    var $div = $("<div class='selector_item'>" + modelPositionObj.type + "<div></div></div>");

    $div.css({
        width: modelPositionObj.w + 'px',
        height: modelPositionObj.h + 'px',
        left: modelPositionObj.x + 'px',
        top: modelPositionObj.y + 'px'
    });

    var $popoverEditBox = createPopoverEditBox(modelPositionObj);

    $div.append($popoverEditBox);

    return $div;
}

// 创建悬浮编辑的小模块
function createPopoverEditBox(modelPositionObj) {
    var domStr = `<div class='popover_edit_box'>
        <button class='up' style='display: ${modelPositionObj.movable ? "inline-block" : "none"}'><i class='icon iconfont icon-shang'></i></button>
        <button class='down' style='display: ${modelPositionObj.movable ? "inline-block" : "none"}'><i class='icon iconfont icon-shang-copy'></i></button>
        <button class='setting'><i class='icon iconfont icon-shezhi'></i></button>
        <button class='delete'><i class='icon iconfont icon-zititubiao2huishouzhan1'></i></button>
    </div>`;

    return $(domStr);
}

class HoverBox {
    constructor(modelObj) {
        this.modelObj = modelObj;

        this.$model = createSelectItem(modelObj);

        this._initialize();
    }

    // 初始化
    _initialize() {
        this._bindEvent();
    }

    // 绑定事件
    _bindEvent() {
        var self = this;
        // 上移
        this.$model.on('click', '.popover_edit_box .up', function() {
            tools.postMessage(iframeWindow, {
                method: 'moveUp',
                data: self.modelData
            }, iframeOrigin);
        });

        // 下移
        this.$model.on('click', '.popover_edit_box .down', function() {
            tools.postMessage(iframeWindow, {
                method: 'moveDown',
                data: self.modelData
            }, iframeOrigin);
        });

        // 设置
        this.$model.on('click', '.popover_edit_box .setting', function() {
            dialogManager.showDialog(self.modelData).then(modelData => {
                console.log(modelData);
                // 保存设置后的modelData替换现有的
                self.modelData = modelData;

                tools.postMessage(iframeWindow, {
                    method: 'setPart',
                    data: self.modelData
                }, iframeOrigin);
            });
        });

        // 删除
        this.$model.on('click', '.popover_edit_box .delete', function() {
            tools.postMessage(iframeWindow, {
                method: 'deletePart',
                data: self.modelData
            }, iframeOrigin);
        });
    }

    // ====================== interface ======================

    // 绑定对应data
    bindModelData(modelData) {
        this.modelData = modelData;
    }

    // 获取$dom
    getDom() {
        return this.$model;
    }
}

export default HoverBox;

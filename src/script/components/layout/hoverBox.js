import dialogManager from '@/script/components/dialogs/dialogManager';

// 创建SelectItem
/**
 * {object} positionObj
 * positionObj.type 模块类型 banner/navbar/focus_box/article/swiper/adv/image_list/text/video_list/adv_list
 * positionObj.movable 是否可以上下移动 boolean
 */
function createSelectItem(positionObj) {
    var $div = $("<div class='selector_item'>" + positionObj.type + "<div></div></div>");

    $div.css({
        width: positionObj.w + 'px',
        height: positionObj.h + 'px',
        left: positionObj.x + 'px',
        top: positionObj.y + 'px'
    });

    var $popoverEditBox = createPopoverEditBox(positionObj);

    $div.append($popoverEditBox);

    return $div;
}

// 创建悬浮编辑的小模块
function createPopoverEditBox(positionObj) {
    var domStr = `<div class='popover_edit_box'>
        <button class='up' style='display: ${positionObj.movable ? "inline-block" : "none"}'><i class='icon iconfont icon-shang'></i></button>
        <button class='down' style='display: ${positionObj.movable ? "inline-block" : "none"}'><i class='icon iconfont icon-shang-copy'></i></button>
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
        this.$model.on('click', '.popover_edit_box .up', function () {
            alert('up');
        });

        // 下移
        this.$model.on('click', '.popover_edit_box .down', function () {
            alert('down');
        });

        // 设置
        this.$model.on('click', '.popover_edit_box .setting', function () {
            dialogManager.showDialog(self.modelData);
        });

        // 删除
        this.$model.on('click', '.popover_edit_box .delete', function () {
            alert('delete');
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

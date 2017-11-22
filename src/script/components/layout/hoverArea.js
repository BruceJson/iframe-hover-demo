import HoverBox from '@/script/components/layout/hoverBox';

import BaseData from '@/script/baseData/baseData';

import ModelDataGetter from '@/script/plugins/modelDataGetter'

const modelDataGetter = new ModelDataGetter();

// 遮罩层工具类
class HoverArea {
    constructor($hoverArea, modelPositionList, iframeHtmlStr) {
        // 遮罩层
        this.$hoverArea = $hoverArea;

        // 元数据集
        this.modelPositionList = modelPositionList;

        // 创建虚拟dom
        this.$visualIframeDom = $(iframeHtmlStr);

        // 初始化
        this._initialize();
    }

    _initialize() {
        // 渲染块状遮罩
        this._render();
    }

    _render() {
        // 清除item列表
        this.$hoverArea.children().remove();


        // 循环位置列表，渲染
        this.modelPositionList.forEach(modelObj => {
            // 创建hoverBox对象
            var hoverBox = new HoverBox(modelObj);
            // 根据model获取对应的dom上的相关设置数据
            var modelData = this._getVisualSettingData(modelObj);
            // 给hoverBox绑定data数据
            hoverBox.bindModelData(modelData);
            // 渲染
            this.$hoverArea.append(hoverBox.getDom());
        });
    }

    // 获取visualDom上的数据列表
    /**
     * 
     * @param {object} modelObj 
     * modelObj => {
     *      w: ***,
     *      h: ***,
     *      guid: ***,
     *      type: ***, // 模块类型 banner/navbar/focus_box/article/swiper/adv/image_list/text/video_list/adv_list
     *      movable: ***,
     *      className: 'router_edit_box'，
     *      matchAttr: 'data-guid'
     * }
     */
    _getVisualSettingData(modelObj) {
        var selector = '.' + modelObj.className + '[' + modelObj.matchAttr + '=' + modelObj.guid + ']';
        var $modelDom = this.$visualIframeDom.find(selector);

        // 获取dom对应的data
        var modelData = modelDataGetter.getData($modelDom);
    }

    // interface

    // 刷新
    refresh(modelPositionList, iframeHtmlStr) {
        // 元数据集
        this.modelPositionList = modelPositionList;

        // 创建虚拟dom
        this.$visualIframeDom = $(iframeHtmlStr);

        this._render();
    }

}

export default HoverArea;

import dialogManager from '@/script/components/dialogs/dialogManager';

import ModelDataGetter from '@/script/plugins/modelDataGetter';

import tools from '@/tools';

import quene from '@/script/plugins/queneManager';

const modelDataGetter = new ModelDataGetter();

var $iframe = $('#iframe');

var iframeWindow = $iframe[0].contentWindow;

var iframeOrigin = $iframe[0].src;

class TopSettingBox {
    constructor($dom, $iframeHtmlStr) {
        this.$dom = $dom;
        // 创建虚拟dom
        this.$visualIframeDom = $iframeHtmlStr;
        this._initialize();
    }

    // 初始化
    _initialize() {
        this._bindEvent();
    }

    _bindEvent() {
        self = this;
        // 背景设置
        this.$dom.find('.btn_bg_setting').click(function() {
            var bgData = modelDataGetter.getData($('<div></div>').append(self.$visualIframeDom).find('#body_bg_setting'));
            console.log('======== 背景设置 ========');
            console.log(bgData);
            dialogManager.showDialog(bgData).then(modelData => {
                console.log(modelData);

                tools.postMessage(iframeWindow, {
                    method: 'setPart',
                    data: modelData
                }, iframeOrigin);
            });
        });
        // 一键还原
        this.$dom.find('.btn_restore').click(function() {
            $iframe[0].contentWindow.location.reload();
        });
        // 撤销
        this.$dom.find('.btn_cancel').click(function() {
            // 队列回退
            quene.undo();

            // 获取当前队列内容
            var content = quene.getContent();

            tools.postMessage(iframeWindow, {
                method: 'refreshContent',
                data: {
                    htmlContent: content
                }
            }, iframeOrigin);
        });
        // 恢复
        this.$dom.find('.btn_resume').click(function() {
            // 队列恢复
            quene.redo();

            // 获取当前队列内容
            var content = quene.getContent();

            tools.postMessage(iframeWindow, {
                method: 'refreshContent',
                data: {
                    htmlContent: content
                }
            }, iframeOrigin);
        });
        // 预览
        this.$dom.find('.btn_preview').click(function() {

        });
        // 保存
        this.$dom.find('.btn_save').click(function() {
            tools.postMessage(iframeWindow, {
                method: 'save'
            }, iframeOrigin);
        });
        // 发布
        this.$dom.find('.btn_release').click(function() {
            tools.postMessage(iframeWindow, {
                method: 'release'
            }, iframeOrigin);
        });
    }
}

export default TopSettingBox;

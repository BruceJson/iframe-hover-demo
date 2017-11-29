import tools from '@/tools';
import HoverArea from '@/script/components/layout/hoverArea.js';
import TopSettingBox from '@/script/components/layout/topSettingBox.js';
import global from '@/global';

import quene from '@/script/plugins/queneManager';

var $iframe = $('#iframe');

var $hoverArea = $('#iframe_shadow_box');

var iframeWindow = $iframe[0].contentWindow;

var iframeOrigin = $iframe[0].src;

var hoverArea;

var topSettingBox;

// console.log(bootstrap);

async function init() {
    // 加载iframe
    await loadIframe($iframe);

    // 绑定事件
    bindEvent();

    // 获取iframe中内容信息
    getIframeInfo();
};

// 防止两个渲染线程冲突
window.onload = function() {
    init();
};

/*======================================================================*/

// 获取iframe中内容信息
function getIframeInfo() {
    tools.postMessage(iframeWindow, {
        method: 'getIframeAllPosition'
    }, iframeOrigin);
}

// 加载iframe
function loadIframe($iframe) {
    return new Promise((resolve, reject) => {
        if ($iframe[0].contentWindow.document.readyState === 'complete') {
            $iframe.css({
                'height': (tools.getIframeHeight($iframe[0])) + 'px'
            });
            resolve();
        } else {
            $iframe.on('load', function() {
                $iframe.css({
                    'height': (tools.getIframeHeight($iframe[0])) + 'px'
                });
                resolve();
            });
        }
    });
}

// 绑定事件
function bindEvent() {
    // 监听postmessage
    window.addEventListener('message', function(e) {
        console.log('=========== onmessage ============');

        /**
         * {Object} e.data
         * {string} e.data.type 请求的类型
         * {Object} e.data.data 请求的传参
         */

        var ret = e.data.data;
        if (e.data.type.indexOf('getIframeAllPositionCallback') >= 0) {
            var modelPositionList = ret.modelPositionList;
            var $iframeHtmlStr = $(ret.htmlStr);

            // 加载iframe，刷新高度
            loadIframe($iframe).then(function() {
                // 重新刷新
                if (!topSettingBox) {
                    topSettingBox = new TopSettingBox($('.global_setting_box'), $iframeHtmlStr);
                }
                if (!hoverArea) {
                    hoverArea = new HoverArea($hoverArea, modelPositionList, $iframeHtmlStr);
                } else {
                    hoverArea.refresh(modelPositionList, $iframeHtmlStr);
                }
            });

        }

        if (e.data.type.indexOf('deletePartCallback') >= 0 || e.data.type.indexOf('moveUp') >= 0 || e.data.type.indexOf('moveDown') >= 0) {
            // 如果是删除，移动操作，则添加至队列
            quene.add(ret.htmlStr);
        }

        // 如果是保存回调或者发布回调
        if (e.data.type.indexOf('saveCallback') >= 0 || e.data.type.indexOf('releaseCallback') >= 0) {
            tools.doNet({
                url: '/plugin/diyspecial/model-save',
                method: 'post',
                data: {
                    id: global.topicId,
                    dom: ret.htmlStr
                }
            }).then(resp => {
                tools.alert('保存成功');
            })
        }
    });

    // 监听resize事件
    window.addEventListener('resize', _.debounce(function() {
        getIframeInfo();
    }, 200));
}

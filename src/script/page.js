import tools from '@/tools';
import iframeMethodCfg from '@/config/iframe_method.conf.js';
import HoverArea from '@/script/components/layout/hoverArea.js';

var $iframe = $('#iframe');

var $hoverArea = $('#iframe_shadow_box');

var iframeWindow = $iframe[0].contentWindow;

var iframeOrigin = $iframe[0].src;

var hoverArea;

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
    tools.postMessage(iframeWindow, iframeMethodCfg['IFRAME_ALL_POSITION'], iframeOrigin);
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

        if (e.data.type === 'getIframeAllPositionCallback') {
            var ret = e.data.data;
            var modelPositionList = ret.modelPositionList;
            var iframeHtmlStr = ret.htmlStr;

            if (!hoverArea) {
                hoverArea = new HoverArea($hoverArea, modelPositionList, iframeHtmlStr);
            } else {
                hoverArea.refresh(modelPositionList, iframeHtmlStr);
            }
        }
    });

    // 监听resize事件
    window.addEventListener('resize', _.debounce(function() {
        getIframeInfo();
    }, 200));
}

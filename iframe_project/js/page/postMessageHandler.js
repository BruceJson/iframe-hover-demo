var handlerCfg = {
    getIframeAllPosition: function (e) {
        var $routerEditBoxs = $('.router_edit_box');


        var modelPositionList = [];

        $routerEditBoxs.each(function () {
            // 添加唯一id
            var guid = tools.getGuid();
            this.setAttribute('data-guid', guid);

            // 获取模块类型
            var type = this.getAttribute('model-type');

            // 获取模块是否可移动
            var movable = this.getAttribute('movable');

            // 获取模块位置
            var position = tools.getPosition({ x: 0, y: 0 }, this);

            // 位置信息
            position.w = this.offsetWidth;
            position.h = this.offsetHeight;

            // guid
            position.guid = guid;

            // type
            position.type = type;

            // 是否可移动
            position.movable = eval(movable);

            position.className = 'router_edit_box';

            position.matchAttr = 'data-guid';

            modelPositionList.push(position);
        });

        window.parent.postMessage({
            type: 'getIframeAllPositionCallback',
            data: {
                modelPositionList: modelPositionList,
                htmlStr: document.body.innerHTML

            }
        }, e.origin);
    }
};

window.addEventListener('message', function (e) {
    console.log('iframe listen message');
    console.log(e);

    var methodName = e.data;

    handlerCfg[methodName](e);
}, false);

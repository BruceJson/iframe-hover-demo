var tools = {
    getPosition: function (position, el, originEl) {
        var parentNode = el.offsetParent;
        if (parentNode === originEl || parentNode.nodeName === 'BODY') {
            return {
                x: position.x + el.offsetLeft,
                y: position.y + el.offsetTop
            };
        } else {
            position.x = position.x + el.offsetLeft;
            position.y = position.y + el.offsetTop;
            return this.getPosition(position, parentNode, originEl);
        }
    },

    postMessage: function (_window, param, origin) {
        _window.postMessage(param, origin);
    },

    getGuid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};

window.tools = tools;

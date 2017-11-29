class BaseEvent {
    constructor() {
        this.eventPool = {};
    }
    attachEvent(event, options) {
        if (this.eventPool[event] && typeof this.eventPool[event].length > 0) {
            var funcArr = this.eventPool[event];
            for (var i = 0; i < funcArr.length; i++) {
                funcArr[i](event, options);
            }
        }
    }
    addEvent(event, callback) {
        if (!this.eventPool[event]) {
            this.eventPool[event] = [];
        }
        this.eventPool[event].push(callback)
    }
    removeEvent(event) {
        delete this.eventPool[event];
    }

    /* ======== event start ======== */
    // 添加事件
    addEventListener(event, callback) {
        this.addEvent(event, callback);
    }

    // 抛出事件
    trigger(event, options) {
        this.attachEvent(event, options);
    }

    // 删除事件
    removeEventListener(event) {
        this.removeEvent(event);
    }
    /* ======== event end ======== */
}
export default BaseEvent;

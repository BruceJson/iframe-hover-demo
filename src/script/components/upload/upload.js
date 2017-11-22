var wuploader = require('webuploader');

class Uploader {
    constructor(selector) {
        this.$selector = $(selector);
    }

    _initialize() {
        _createUploaderBox();
    }

    _createUploaderBox() {
        var domStr =
            `<div id='router_uploader'></div>`;
        return $('<div>');
    }

    _bindEvent() {

    }

    render() {

    }
}

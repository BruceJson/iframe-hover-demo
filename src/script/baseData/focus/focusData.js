// 焦点图data
class FocusData {
    constructor(guid = '', title = '', focusType = 'article', count = 0) {
        this.guid = guid;
        this.type = 'focus';
        this.title = title;
        this.focusType = focusType;
        this.count = count;
    }
}

export default FocusData;

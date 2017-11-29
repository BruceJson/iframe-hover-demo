// 栏目列表
class ColumnListData {
    constructor(guid = '', type = '', title = '', groupType = 'in', tagIds = '') {
        this.guid = guid;
        this.type = type;
        this.title = title;
        this.groupType = groupType || 'in';
        this.tagIds = tagIds;
    }
}

export default ColumnListData;

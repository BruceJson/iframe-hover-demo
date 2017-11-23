import tools from '@/tools';
class UploadFile {
    constructor(file) {
        this.file = file;
        this._initialize();
    }

    _initialize() {
        this.guid = tools.getGuid();
        // state => waiting:准备上传 uploading:正在上传 complete:上传成功
        this.state = 'waiting';
    }
}

export default UploadFile;

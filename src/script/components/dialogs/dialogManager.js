import NavSettingDialog from '@/script/components/dialogs/navSettingDialog'

class DialogManager {
    constructor($box) {
        this.$el = $box;
        this._initialize();
    }

    _initialize() {
        this._initDialogs();
        this._render();
    }

    _initDialogs() {
        this.navDialog = new NavSettingDialog({
            navArr: [{
                title: '标题1',
                jumpLink: 'http: www.baidu.com'
            }, {
                title: '标题2',
                jumpLink: 'http: www.baidu.com'
            }, {
                title: '标题3',
                jumpLink: 'http: www.baidu.com'
            }]
        });
    }

    // 渲染
    _render() {
        this.$el.append(this.navDialog.getDom());
    }

    // =============== interface ================
    showDialog(modelData) {
        switch (modelData.type) {
            case 'banner':
                this.navDialog.show(modelData);
                break;
            case 'navbar':
                this.navDialog.show(modelData);
                break;
            case 'focus':
                this.navDialog.show(modelData);
                break;
            case 'article':
                this.navDialog.show(modelData);
                break;
            case 'swiper':
                this.navDialog.show(modelData);
                break;
            case 'adv':
                this.navDialog.show(modelData);
                break;
            case 'images':
                this.navDialog.show(modelData);
                break;
            case 'text':
                this.navDialog.show(modelData);
                break;
            case 'video':
                this.navDialog.show(modelData);
                break;
            case 'advList':
                this.navDialog.show(modelData);
                break;
            default:
                break;
        }
    }
}

export default new DialogManager($('#dialog_box'));

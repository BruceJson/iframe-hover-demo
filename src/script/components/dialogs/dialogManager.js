import BannerSettingDialog from '@/script/components/dialogs/bannerSettingDialog'
import NavSettingDialog from '@/script/components/dialogs/navSettingDialog'
import AdvSettingDialog from '@/script/components/dialogs/advSettingDialog'
import AdvListSettingDialog from '@/script/components/dialogs/advListSettingDialog'
import SwiperSettingDialog from '@/script/components/dialogs/swiperSettingDialog'
import FocusSettingDialog from '@/script/components/dialogs/focusSettingDialog'
import ColumnSettingDialog from '@/script/components/dialogs/columnSettingDialog'
import TextSettingDialog from '@/script/components/dialogs/textSettingDialog'
import BgSettingDialog from '@/script/components/dialogs/bgSettingDialog'

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
        this.bannerDialog = new BannerSettingDialog();
        this.navDialog = new NavSettingDialog();
        this.advDialog = new AdvSettingDialog();
        this.advListDialog = new AdvListSettingDialog();
        this.swiperDialog = new SwiperSettingDialog();
        this.focusDialog = new FocusSettingDialog();
        this.columnDialog = new ColumnSettingDialog();
        this.textDialog = new TextSettingDialog();
        this.bgDialog = new BgSettingDialog();
    }

    // 渲染
    _render() {
        this.$el.append(this.bannerDialog.getDom());
        this.$el.append(this.navDialog.getDom());
        this.$el.append(this.advDialog.getDom());
        this.$el.append(this.advListDialog.getDom());
        this.$el.append(this.swiperDialog.getDom());
        this.$el.append(this.focusDialog.getDom());
        this.$el.append(this.columnDialog.getDom());
        this.$el.append(this.textDialog.getDom());
        this.$el.append(this.bgDialog.getDom());
    }

    // =============== interface ================
    showDialog(modelData, resolve) {
        return new Promise((resolve, reject) => {
            switch (modelData.type) {
                case 'banner':
                    this.bannerDialog.show(modelData, resolve);
                    break;
                case 'navbar':
                    this.navDialog.show(modelData, resolve);
                    break;
                case 'focus':
                    this.focusDialog.show(modelData, resolve);
                    break;
                case 'article':
                    this.columnDialog.show(modelData, resolve);
                    break;
                case 'swiper':
                    this.swiperDialog.show(modelData, resolve);
                    break;
                case 'adv':
                    this.advDialog.show(modelData, resolve);
                    break;
                case 'images':
                    this.columnDialog.show(modelData, resolve);
                    break;
                case 'text':
                    this.textDialog.show(modelData, resolve);
                    break;
                case 'video':
                    this.columnDialog.show(modelData, resolve);
                    break;
                case 'advList':
                    this.advListDialog.show(modelData, resolve);
                    break;
                case 'bg':
                    this.bgDialog.show(modelData, resolve);
                    break;
                default:
                    break;
            }

        });
    }
}

export default new DialogManager($('#dialog_box'));

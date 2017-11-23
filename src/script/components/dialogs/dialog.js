import tools from '@/tools'
class Dialog {
    /**
     * {object} modelObj
     */
    constructor() {

    }

    _initialize() {
        this.$dialog;
    }

    _showDialog() {
        this.$dialog.modal('show');
    }

    _hideDialog() {
        this.$dialog.modal('hide');
    }

    // @interface
    show() {
        this._showDialog();
    }

    hide() {
        this._hideDialog();
    }
}


export default Dialog;

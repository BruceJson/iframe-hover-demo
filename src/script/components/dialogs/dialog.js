import tools from '@/tools'
class Dialog {
    /**
     * {object} modelObj
     */
    constructor(modelData) {
        this.modelData = tools.deepClone(modelData);
        this.$dialog;
    }

    show() {
        this.$dialog.modal('show');
    }

    hide() {
        this.$dialog.modal('hide');
    }
}


export default Dialog;

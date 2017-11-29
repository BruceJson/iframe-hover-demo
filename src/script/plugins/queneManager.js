import BaseEvent from '@/script/components/core/baseEvent';

class QueneManager extends BaseEvent {
    constructor() {
        super();
        this._initialize();
    }

    _initialize() {
        this.index = 0;
        this.queneList = [];
    }

    // 清空（重置）队列
    reset() {
        this.index = 0;
        this.queneList = [];
    }

    // 添加内容至队列
    add(str) {
        var q_len = this.queneList.length;
        if (this.index === 0 && q_len === 0) {
            // 如果当前的步数刚好是列表的最后一个，那么直接在后面添加即可
            this.queneList.push(str);
        } else if (this.index === (q_len - 1)) {
            // 如果当前的步数刚好是列表的最后一个，那么直接在后面添加即可
            this.queneList.push(str);
        } else if (this.index + 1 < (q_len - 1)) {
            // 如果当前的步数不是列表的最后一个，即为撤销的某一步后添加一个新的项
            // 添加完成后将后面的项移除
            var _queneList = [];
            for (var i = 0; i < (this.index + 1); i++) {
                _queneList.push(this.queneList[i]);
            }

            _queneList.push(str);

            this.queneList = _queneList;
        }

        this.index = this.queneList.length - 1;


        this.trigger('change', this.getContent());
    }

    // 回到上一步（撤销）
    undo() {
        this.index--;

        var isfirst = (this.index < 0);

        this.index = isfirst ? 0 : this.index;

        this.trigger('change', this.getContent());

        return isfirst;
    }

    // 去到下一步（前进）
    redo() {
        var q_len = this.queneList.length;

        this.index++;

        var islast = (this.index > (q_len - 1));

        this.index = islast ? (q_len - 1) : this.index;

        this.trigger('change', this.getContent());

        return islast;
    }

    // 获取内容
    getContent() {
        return this.queneList[this.index];
    }
}

export default new QueneManager();

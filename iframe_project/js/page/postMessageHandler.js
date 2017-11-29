function setBanner(modelData) {
    var $router_edit_box = $('.router_edit_box[data-guid=' + modelData.guid + ']');
    $router_edit_box.find('.router_img').attr('src', modelData.src).attr('data-src', modelData.src);

    $router_edit_box.find('img').on('load', function() {
        handlerCfg.getIframeAllPosition();
    });
}

function setNavbar(modelData) {
    var $router_edit_box = $('.router_edit_box[data-guid=' + modelData.guid + ']');
    var navItemList = modelData.navItemList;

    var items = '';
    for (var i = 0; i < navItemList.length; i++) {
        var nav = navItemList[i];
        var item =
            "<a href='" + nav.link + "' class='router_box_item nav_item transition_3' data-title='" + nav.title + "' data-link='" + nav.link + "'>" +
            "<span>" + nav.title + "</span>" +
            "</a>";
        items += item;
    }
    $router_edit_box.find('.nav_list').children().remove();

    $router_edit_box.find('.nav_list').append($(items));
}

function setFocus(modelData) {
    var $router_edit_box = $('.router_edit_box[data-guid=' + modelData.guid + ']');
    // data-title='焦点图1' data-focus-type='images' data-count='5'
    // guid = '', title = '', focusType = 'article', count = 0
    $router_edit_box.attr('data-title', modelData.title);
    $router_edit_box.attr('data-focus-type', modelData.focusType);
    $router_edit_box.attr('data-count', modelData.count);

    // 设置自定义标签
    var $router_focusmap = $router_edit_box.find('router-focusmap');
    $router_focusmap.attr('router-title', modelData.title);
    $router_focusmap.attr('router-type', modelData.focusType);
    $router_focusmap.attr('router-count', modelData.count);
}

function setColumn(modelData) {
    var $router_edit_box = $('.router_edit_box[data-guid=' + modelData.guid + ']');

    // data-type='article' data-title='article1' data-group-type='in' data-tagids='5a124881cc1193e41700002c,5a124879cc1193e41700002b,5a124870cc1193901b00002d'
    // guid = '', type = '', title = '', groupType = 'in', tagIds = ''

    $router_edit_box.attr('data-title', modelData.title);
    $router_edit_box.attr('data-group-type', modelData.groupType);
    $router_edit_box.attr('data-tagids', modelData.tagIds);
    $router_edit_box.attr('data-type', modelData.type);

    // 设置自定义标签
    // type='article' title='article1' datamode='in' 
    // tagids='5a124881cc1193e41700002c,5a124879cc1193e41700002b,5a124870cc1193901b00002d' dateformat='Y-m-h' count='3'
    var $router_list = $router_edit_box.find('router-list');
    $router_list.attr('title', modelData.title);
    $router_list.attr('datamode', modelData.groupType);
    $router_list.attr('tagids', modelData.tagIds);
    $router_list.attr('type', modelData.type);
    $router_list.attr('dateformat', 'Y-m-h');
}

function setSwiper(modelData) {
    var $router_edit_box = $('.router_edit_box[data-guid=' + modelData.guid + ']');

    var swiperItemList = modelData.swiperItemList;
    var items = '';
    for (var i = 0; i < swiperItemList.length; i++) {
        var swiperItem = swiperItemList[i];
        // src, link
        var item =
            "<div class='swiper-slide'>" +
            "<div class='router_box_item swiper_inner_item'>" +
            "<a href='" + swiperItem.link + "' class='block' data-link='" + swiperItem.link + "'>" +
            "<img data-src='" + swiperItem.src + "' src='" + swiperItem.src + "'/>" +
            "</a>" +
            "</div>" +
            "</div>";
        items += item;
    }
    $router_edit_box.find('.swiper-wrapper').children().remove();

    $router_edit_box.find('.swiper-wrapper').append($(items));

    $router_edit_box.find('img').on('load', function() {
        handlerCfg.getIframeAllPosition();
    });
}

function setAdv(modelData) {
    var $router_edit_box = $('.router_edit_box[data-guid=' + modelData.guid + ']');

    // <div class='router_edit_box section' movable='true' model-type='adv'>
    //         <!-- 广告位 adv_box -->
    //         <div class='block adv_img_box'>
    //             <div class='adv_img_inner_box'>
    //                 <a class='block' data-link='http://www.baidu.com'>
    //                     <img class='adv_img' data-src='/static/img/icon_7.png' src='../img/icon_7.png'>
    //                 </a>
    //             </div>
    //         </div>
    //     </div>

    // guid = '', src = '', link = '', name = ''

    $router_edit_box.find('.adv_img').attr('data-src', modelData.src).attr('src', modelData.src);
    $router_edit_box.find('a').attr('data-link', modelData.link).attr('href', modelData.link);


    $router_edit_box.find('img').on('load', function() {
        handlerCfg.getIframeAllPosition();
    });
}

function setText(modelData) {
    var $router_edit_box = $('.router_edit_box[data-guid=' + modelData.guid + ']');

    $router_edit_box.children().remove();
    $router_edit_box.html(modelData.value);
}

function setAdvList(modelData) {
    var $router_edit_box = $('.router_edit_box[data-guid=' + modelData.guid + ']');

    var advList = modelData.advList;
    var items = '';
    for (var i = 0; i < advList.length; i++) {
        var adv = advList[i];
        // guid = '', src = '', link = '', name = ''
        var item =
            "<div class='router_box_item adv_list_item adv_list_item_1'>" +
            "<a href='" + adv.link + "' class='block width_full height_full' data-name='" + adv.name + "' data-link='" + adv.link + "'>" +
            "<img class='adv_img' src='" + adv.src + "' data-src='" + adv.src + "'>" +
            "</a>" +
            "</div>";
        items += item;
    }
    $router_edit_box.find('.adv_list_inner_box').children().remove();

    $router_edit_box.find('.adv_list_inner_box').append($(items));

    $router_edit_box.find('img').on('load', function() {
        handlerCfg.getIframeAllPosition();
    });
}

function setBg(modelData) {
    var $router_edit_box = $('.router_edit_box[data-guid=' + modelData.guid + ']');

    // <div id='body_bg_setting' model-type='bg' data-bg-type='color' data-bg-src='' data-bg-cover-type='' data-bg-position='' data-bg-color='#F1EDE2'></div>
    // bgType = 'image', bgSrc = '', bgCoverType = 'cover', bgPosition = 'center', bgColor = '#ffffff'
    $('#body_bg_setting')
        .attr('data-bg-type', modelData.bgType)
        .attr('data-bg-src', modelData.bgSrc)
        .attr('data-bg-cover-type', modelData.bgCoverType)
        .attr('data-bg-position', modelData.bgPosition)
        .attr('data-bg-color', modelData.bgColor);

    $('body').css({
        'background-size': modelData.bgCoverType,
        'background-position': modelData.bgPosition
    });
    if (modelData.bgType === 'image') {
        $('body').css({
            'background-image': 'url(' + modelData.bgSrc + ')',
            'background-color': 'transparent'
        });
    } else {
        $('body').css({
            'background-image': 'none',
            'background-color': modelData.bgColor
        });
    }
}

function getPositionList() {
    var $routerEditBoxs = $('.router_edit_box');

    var modelPositionList = [];

    $routerEditBoxs.each(function() {
        if (!this.getAttribute('data-guid')) {
            // 添加唯一id
            var guid = tools.getGuid();
            this.setAttribute('data-guid', guid);
        } else {
            guid = this.getAttribute('data-guid');
        }

        // 获取模块类型
        var type = this.getAttribute('model-type');

        // 获取模块是否可移动
        var movable = this.getAttribute('movable');

        // 获取模块位置
        var position = tools.getPosition({ x: 0, y: 0 }, this);

        // 位置信息
        position.w = this.offsetWidth;
        position.h = this.offsetHeight;

        // guid
        position.guid = guid;

        // type
        position.type = type;

        // 是否可移动
        position.movable = eval(movable);

        position.className = 'router_edit_box';

        position.matchAttr = 'data-guid';

        modelPositionList.push(position);
    });

    return modelPositionList;
}

var handlerCfg = {
    getIframeAllPosition: function(e) {
        var modelPositionList = getPositionList();

        window.parent.postMessage({
            type: 'getIframeAllPositionCallback',
            data: {
                modelPositionList: modelPositionList,
                htmlStr: document.body.innerHTML

            }
        }, '*');

    },
    // 设置模块
    setPart: function(e) {
        var modelData = e.data.data;

        switch (modelData.type) {
            case 'banner':
                setBanner(modelData);
                break;
            case 'navbar':
                setNavbar(modelData);
                break;
            case 'focus':
                setFocus(modelData);
                break;
            case 'article':
                setColumn(modelData);
                break;
            case 'swiper':
                setSwiper(modelData);
                break;
            case 'adv':
                setAdv(modelData);
                break;
            case 'images':
                setColumn(modelData);
                break;
            case 'text':
                setText(modelData);
                break;
            case 'video':
                setColumn(modelData);
                break;
            case 'advList':
                setAdvList(modelData);
                break;
            case 'bg':
                setBg(modelData);
                break;
            default:
                break;
        }
    },

    // 删除模块
    deletePart: function(e) {
        var modelData = e.data.data;

        var $router_edit_box = $('.router_edit_box[data-guid=' + modelData.guid + ']');

        var $section = $router_edit_box.hasClass('section') ? $router_edit_box : $router_edit_box.parents('.section').eq(0);

        if ($section.hasClass('.router_edit_box')) {
            // 如果模块既是section
            $section.remove();
        } else if ($section.find('.router_edit_box').length <= 1) {
            // 如果section内只有一个router_edit_box
            $section.remove();
        } else {
            // 如果section内不止一个router_edit_box
            $router_edit_box.remove();
        }

        setTimeout(() => {
            var modelPositionList = getPositionList();
            window.parent.postMessage({
                type: 'getIframeAllPositionCallback|deletePartCallback',
                data: {
                    modelPositionList: modelPositionList,
                    htmlStr: document.body.innerHTML

                }
            }, '*');
        }, 100);
    },

    // 上移模块
    moveUp: function(e) {
        var modelData = e.data.data;

        var $router_edit_box = $('.router_edit_box[data-guid=' + modelData.guid + ']');
        if (!eval($router_edit_box.attr('movable'))) {
            // 如果不能移动
            return;
        }

        var $section = $router_edit_box.hasClass('section') ? $router_edit_box : $router_edit_box.parents('.section').eq(0);

        var list = $section.parent().get(0);

        var item = $section.get(0);

        var pre_item = item.previousElementSibling;

        if (pre_item && eval(pre_item.getAttribute('movable'))) {
            list.insertBefore(item, pre_item);
        }

        setTimeout(() => {
            var modelPositionList = getPositionList();
            window.parent.postMessage({
                type: 'getIframeAllPositionCallback|moveUp',
                data: {
                    modelPositionList: modelPositionList,
                    htmlStr: document.body.innerHTML

                }
            }, '*');
        }, 100);
    },

    // 下移模块
    moveDown: function(e) {
        var modelData = e.data.data;

        var $router_edit_box = $('.router_edit_box[data-guid=' + modelData.guid + ']');

        if (!eval($router_edit_box.attr('movable'))) {
            // 如果不能移动
            return;
        }

        var $section = $router_edit_box.hasClass('section') ? $router_edit_box : $router_edit_box.parents('.section').eq(0);

        var list = $section.parent().get(0);

        var item = $section.get(0);

        var next_item = item.nextElementSibling;

        if (next_item && eval(next_item.getAttribute('movable'))) {
            list.insertBefore(next_item, item);
        }

        setTimeout(() => {
            var modelPositionList = getPositionList();
            window.parent.postMessage({
                type: 'getIframeAllPositionCallback|moveDown',
                data: {
                    modelPositionList: modelPositionList,
                    htmlStr: document.body.innerHTML

                }
            }, '*');
        }, 100);
    },

    refreshContent: function(e) {
        var htmlContent = e.data.data.htmlContent;

        document.body.innerHTML = htmlContent;

        setTimeout(() => {
            var modelPositionList = getPositionList();
            window.parent.postMessage({
                type: 'getIframeAllPositionCallback',
                data: {
                    modelPositionList: modelPositionList,
                    htmlStr: document.body.innerHTML

                }
            }, '*');
        }, 100);
    },

    // 保存
    save: function(e) {
        window.parent.postMessage({
            type: 'saveCallback',
            data: {
                htmlStr: document.body.innerHTML
            }
        }, '*');
    },

    // 发布
    release: function() {
        window.parent.postMessage({
            type: 'releaseCallback',
            data: {
                htmlStr: document.body.innerHTML
            }
        }, '*');
    }
};

window.addEventListener('message', function(e) {
    console.log('iframe listen message');
    console.log(e);

    var methodName = e.data.method;

    handlerCfg[methodName](e);
}, false);

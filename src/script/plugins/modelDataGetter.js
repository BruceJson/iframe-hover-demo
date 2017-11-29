import BaseData from '@/script/baseData/baseData';

// 获取bannerdata data-src
function getBannerData($banner) {
    var guid = getDomGuid($banner);
    var src = $banner.find('.router_img').attr('data-src');
    return new BaseData.BannerData(guid, src);
}

/**
 * 获取navbardata
 * @param $navbar
 * data-title
 * data-link
 */
function getNavbarData($navbar) {
    var guid = getDomGuid($navbar);
    var arr = [];
    $navbar.find('.router_box_item').each(function() {
        var title = this.getAttribute('data-title');
        var link = this.getAttribute('data-link');

        var navItemData = new BaseData.NavItemData(title, link);

        arr.push(navItemData);
    });

    return new BaseData.NavbarData(guid, arr);
}

/**
 * 获取焦点图data
 * @param $focus
 * data-title 焦点图名称
 * data-focus-type 焦点图类型
 * data-count 焦点图数量
 */
function getFocusData($focus) {
    var guid = getDomGuid($focus);
    var title = $focus.attr('data-title');
    var focusType = $focus.attr('data-focus-type');
    var count = $focus.attr('data-count');

    return new BaseData.FocusData(guid, title, focusType, count);
}

/**
 * 获取轮播图data
 * @param $swiper
 * data-src
 * data-link
 */
function getSwiperData($swiper) {
    var guid = getDomGuid($swiper);
    var arr = [];
    $swiper.find('.router_box_item').each(function() {
        var src = $(this).find('img').attr('data-src');
        var link = $(this).find('a').attr('data-link');

        var swiperItemData = new BaseData.SwiperItemData(src, link);

        arr.push(swiperItemData);
    });

    return new BaseData.SwiperData(guid, arr);
}

/**
 * 获取栏目data
 * @param $column
 * data-type // 栏目类型 => article:图文 images:图集 video:视频 
 * data-title // 栏目名称
 * data-group-type // 聚合方式 => in:满足任意关联标签  all:满足所有关联标签
 * data-tagids // 标签ids
 */
function getColumnData($column) {
    var guid = getDomGuid($column);
    var type = $column.attr('data-type');
    var title = $column.attr('data-title');
    var groupType = $column.attr('data-group-type');
    var tagIds = $column.attr('data-tagids');

    return new BaseData.ColumnListData(guid, type, title, groupType, tagIds);
}

/**
 * 获取广告位data
 * @param $adv
 * data-src
 * data-link 
 */
function getAdvData($adv) {
    var guid = getDomGuid($adv);
    var src = $adv.find('img').attr('data-src');
    var link = $adv.find('a').attr('data-link');

    return new BaseData.AdvData(guid, src, link);
}

/**
 * 获取广告位列表data
 * @param $advList
 * data-name 单个广告位的名称
 * data-link 单个广告位的跳转链接
 * data-src 单个广告位的图片链接
 */
function getAdvListData($advList) {
    var guid = getDomGuid($advList);
    var arr = [];
    $advList.find('.router_box_item').each(function() {
        var link = $(this).find('a').attr('data-link');
        var name = $(this).find('a').attr('data-name');
        var src = $(this).find('img').attr('data-src');

        var advData = new BaseData.AdvData('', src, link, name);

        arr.push(advData);
    });

    return new BaseData.AdvListData(guid, arr);
}

/**
 * 文字块data
 * @param $text 
 * 
 */
function getTextData($text) {
    var guid = getDomGuid($text);
    var value = $text.find('.router_text_box').html();
    return new BaseData.TextData(guid, value);
}

/**
 * 背景设置data
 * @param $body 
 * data-bg-type: image/color 背景类型，图片、颜色
 * data-bg-src  背景图片链接
 * data-bg-cover-type:cover/inherit     背景图片平铺类型：平铺、默认
 * data-bg-position:left/center/left        背景不是平铺时，所处于的位置
 * data-bg-color        背景颜色色值
 */
function getBgData($body) {

    var bgType = $body.attr('data-bg-type');
    var bgSrc = $body.attr('data-bg-src');
    var bgCoverType = $body.attr('data-bg-cover-type');
    var bgPosition = $body.attr('data-bg-position');
    var bgColor = $body.attr('data-bg-color');

    return new BaseData.BgData(bgType, bgSrc, bgCoverType, bgPosition, bgColor);
}

// 获取dom的type
function getDomType($modelDom) {
    return $modelDom.attr('model-type');
}

// 获取dom的type
function getDomGuid($modelDom) {
    return $modelDom.attr('data-guid');
}

class ModelDataGetter {
    getData($modelDom) {
        var type = getDomType($modelDom);
        var data;
        switch (type) {
            case 'banner':
                data = getBannerData($modelDom);
                break;
            case 'navbar':
                data = getNavbarData($modelDom);
                break;
            case 'focus':
                data = getFocusData($modelDom);
                break;
            case 'article':
                data = getColumnData($modelDom);
                break;
            case 'swiper':
                data = getSwiperData($modelDom);
                break;
            case 'adv':
                data = getAdvData($modelDom);
                break;
            case 'images':
                data = getColumnData($modelDom);
                break;
            case 'text':
                data = getTextData($modelDom);
                break;
            case 'video':
                data = getColumnData($modelDom);
                break;
            case 'advList':
                data = getAdvListData($modelDom);
                break;
            case 'bg':
                data = getBgData($modelDom);
                break;
            default:
                break;
        }

        return data;
    }
}

export default ModelDataGetter;

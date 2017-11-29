class BgData {
    // data-bg-type: image/color 背景类型，图片、颜色
    // data-bg-src  背景图片链接
    // data-bg-cover-type:cover/inherit     背景图片平铺类型：平铺、默认
    // data-bg-position:left/center/left        背景不是平铺时，所处于的位置
    // data-bg-color        背景颜色色值

    constructor(bgType = 'image', bgSrc = '', bgCoverType = 'cover', bgPosition = 'center', bgColor = '#ffffff') {
        this.type = 'bg';
        this.bgType = bgType || 'image';
        this.bgSrc = bgSrc || '';
        this.bgCoverType = bgCoverType || 'cover';
        this.bgPosition = bgPosition || 'center';
        this.bgColor = bgColor || '#ffffff';
    }
}
export default BgData;

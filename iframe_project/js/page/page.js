// 初始化页面中的swiper
function initSwiper() {
    $('.swiper-container').each(function(index, el) {

        var mySwiper = new Swiper(el, {
            pagination: '.pagination',
            loop: true,
            paginationClickable: true
        });
        $(this).data('swiper', mySwiper);
        ~ function(mySwiper) {
            $(el).find('.btn_swiper_pre').click(function() {
                mySwiper.swipePrev()
            });

            $(el).find('.btn_swiper_next').click(function() {
                mySwiper.swipeNext()
            });
        }(mySwiper);
    });
}

~ function init() {
    // 初始化页面中的swiper
    initSwiper();
}();

(function ($) {
    $.fn.extend({
        zoomIn: function () {
            //自定义函数形成的JS文件和插件，两者可以视作相同；
            //仅仅是调用上有所区别；

            // $("<div class = 'floatBox'></div>").appendTo(".container");
            // $("<div class = 'smallBox'></div>").appendTo('.floatBox');
            // $("<img src='${img/small.jpg}'></img>").appendTo(".floatBox");

            // $("<div class = 'bigBox'></div>").appendTo('.container');
            // $("<img src='${img/big.jpg}'></img>").appendTo(".bigBox");

            $('.smallBox').hide();
            $('.bigBox').hide();

            $('.floatBox').mouseenter(function () {
                $('.smallBox').show();
                $('.bigBox').show();
            }).mouseleave(function () {
                //mouseleave是和mouseenter配套使用的
                $('.smallBox').hide();
                $('.bigBox').hide();
            })

            $('.floatBox').mousemove(function (e) {
                //让鼠标位于移动框中心
                //为了还原这个情况，设置samllBoxOffsetLeft
                var smallboxOffsetLeft = parseInt(e.clientX) - parseInt($('.smallBox').width()) / 2;
                var smallboxOffsetTop = parseInt(e.clientY) - parseInt($('.smallBox').height()) / 2;

                //移动的边界条件
                /* X的边界条件：0<left<=img.width-smallBox.offsetWidth
                 * Y的边界条件：0<top<=img.height-smallBox.offsetHeight
                 */
                var maxX = $('.floatBox').width() - $('.smallBox').width();
                var maxY = $('.floatBox').height() - $('.smallBox').height();

                smallboxOffsetLeft = Math.min(maxX, Math.max(0, smallboxOffsetLeft));
                smallboxOffsetTop = Math.min(maxY, Math.max(0, smallboxOffsetTop));
                $('.smallBox')[0].style.left = smallboxOffsetLeft + 'px';
                $('.smallBox')[0].style.top = smallboxOffsetTop + 'px';

                //小框、大图的移动比例一致
                var biliX = smallboxOffsetLeft / maxX;
                var biliY = smallboxOffsetTop / maxY;

                //$('.bigBox>img')[0].style.left = -biliX * $('.bigBox>img')[0].offsetWidth + 'px';
                //$('.bigBox>img')[0].style.top = -biliY * $('.bigBox>img')[0].offsetHeight + 'px';
                var bigMaxX = $('.bigBox>img').width() - $('.bigBox').width();
                var bigMaxY = $('.bigBox>img').width() - $('.bigBox').width();

                $('.bigBox>img')[0].style.left = -biliX * bigMaxX + 'px';
                $('.bigBox>img')[0].style.top = -biliY * bigMaxY + 'px';

            });

            return this;
        }
    })
})(jQuery);
(function ($) {
    $.fn.extend({
        noclipMove: function (options) {
            //--------options解析-------
            var width = options.width;
            var height = options.height;
            var speed = options.speed;

            //设置容器宽、高
            $(".container").css({
                "width": width,
                "height": height
            })

            var index = 0;
            var itemsLength = $(".items").length;

            //获取第一张图的src
            var firstImgScr = $('.items').eq(0).attr('src');
            console.log(firstImgScr);

            //新增最后一个图片
            $('.items').eq(itemsLength - 1).after($("<img class='items' src='" + firstImgScr + "' style='left:" + 500 * (itemsLength - 1) + "px" + "'></img>"));
            //新增焦点组
            $("<div class='nav'></div>").appendTo('.container');
            for (var i = 0; i < itemsLength; i++) {
                $("<div class='items1'></div>").appendTo('.nav');
            }
            //新增左右方向键
            $("<div class='left'>&lt;</div>").appendTo('.container');
            $("<div class='right'>&gt;</div>").appendTo('.container');


            //更新长度
            itemsLength = $(".items").length;

            //修改图片容器宽、高
            $('.items').css({
                "width": width,
                "height": height
            })

            //新增变换数组
            var arr = [];
            for (var i = 0; i < itemsLength; i++) {
                arr[i] = i;
            }

            //焦点轮播
            $(".items1").eq(0).css({
                "background-color": "royalblue"
            });
            $(".items1").hover(function () {
                //取得当前items1位置的下标
                index = $(this).index();
                arrChange(index);
                focusChange();
                imgChange();
            });

            //方向控制轮播
            //-1 (0 1 2 3..) itemsLength(边界数字和数组长度相等)
            $(".right").on("click", function () {
                // 点击 -> index+=1 -> 处理
                index = index + 1;
                
                console.log(index);
                arrChange(index);
                console.log(arr)
                focusChange();
                
                if(index===4){
                    index=0;
                    focusChange();
                }

                //必须等动画完结之后，修改原始的引用参数
                //因为动画尚未完成时修改原始引用参数，会产生另一个根据参数变化而生成的动画序列
                //思路：动画进行到最后一张，动画完成后跳到第一张
                imgChange(function () {
                    if (index === 4) {

                        //瞬间置位
                        index = 0;
                        arrChange(index);
                        console.log(arr);

                        for (var i = 0; i < itemsLength; i++) {
                            (function () {
                                var temp = i;
                                $(".items").eq(temp).stop().css({
                                    "left": parseInt(500 * arr[temp]) + 'px'
                                });
                            })();
                        }
                    }
                });
            });

            $(".left").on("click", function () {
                // 点击 - index+=1 - 处理
                index = index - 1;

                if (index === -1) {
                    index = 4;
                    arrChange(index);
                    console.log(arr);

                    for (var i = 0; i < itemsLength; i++) {
                        (function () {
                            var temp = i;
                            $(".items").eq(temp).stop().css({
                                "left": parseInt(500 * arr[temp]) + 'px'
                            });
                        })();
                    }

                    //滑动到第三张
                    index = 3;
                    arrChange(index);
                    imgChange();
                }

                arrChange(index);
                focusChange();
                imgChange();
            });

            /* 
                函数封装：
                1、arr转变
                2、焦点变化
                3、轮播图变化
            */

            function arrChange(index) {
                //index 
                /* 如果arr[index]大于0，数组循环-1，"直到"arr[index]===0;
                    如果arr[index]小于0，数组循环+1，“直到”rr[index]===0；
                     */
                if (arr[index] > 0) {
                    while (arr[index] > 0) {
                        //减去一
                        for (var i = 0; i < itemsLength; i++) {
                            arr[i] -= 1;
                        }
                    }
                }
                else if (arr[index] < 0) {
                    while (arr[index] < 0) {
                        for (var i = 0; i < itemsLength; i++) {
                            arr[i] += 1;
                        }
                    }
                } else if (arr[index] === 0) ({})

                return arr;
            }

            function focusChange(parameter) {
                //到了最后一张，焦点要回归原始状态
                $(".items1").eq(index).css({
                    "background-color": "royalblue"
                }).siblings().css({
                    "background-color": "rgba(0,0,0,0.5)"
                });
            }

            function imgChange(callback) {
                console.log("imgRun");

                /* 选中所有items，根据变化数组得出具体left偏移 */

                for (var i = 0; i < itemsLength; i++) {
                    (function () {
                        var temp = i;
                        $(".items").eq(temp).stop().animate({
                            "left": parseInt(500 * arr[temp]) + 'px'
                        }, speed, callback);
                    })();
                }
            }

            function action(index) {
                arrChange(index);
                focusChange();
                imgChange();
            }


        }
    })
})(jQuery);
(function ($) {
    $.fn.extend({
        noclipMove: function (options) {
            //--------options解析-------
            var width = options.width;
            var height = options.height;
            var speed = options.speed;
            
            //设置节流阀；轮播一直向右的情况下，焦点变化有问题
            var flag = 1;

            //设置容器属性
            $(".moveContainer").css({
                "width": width,
                "height": height,
                "position":"relative",
                "overflow":"hidden"
            })

            var index = 0;
            var itemsLength = $(".moveItems").length;

            //获取第一张图的src
            var firstImgScr = $('.moveItems').eq(0).attr('src');

            //新增最后一个图片
            $('.moveItems').eq(itemsLength - 1).after($("<img src='" + firstImgScr + "' class='moveItems'></img>"));

            //更新长度
            itemsLength = $(".moveItems").length;

            //修改所有图片的left和其他属性
            for (var i = 0; i < itemsLength; i++) {
                $('.moveItems').eq(i).css({
                    "width":width,
                    "height":height,
                    "position":'absolute',
                    "left": width * i + 'px'
                });
            }   

            //新增焦点组、修改属性
            $("<div class='nav'></div>").appendTo('.moveContainer');
            $(".nav").css({
                "width":100+'%',
                "height":15+'px',
                "text-align":"center",
                "position":"absolute",
                "left":50+"%",
                "transform":"translateX(-50%)",
                "bottom":10+'%'
            });

            //新增焦点、修改属性
            for (var i = 0; i < (itemsLength - 1); i++) {
                $("<div class='items1'></div>").appendTo('.nav');
            }

            $('.items1').css({
                "display":"inline-block",
                "width":15+'px',
                "height":15+'px',
                "border-radius":50+'%',
                "background-color":'rgba(0,0,0,0.5)',
                "margin-right":15+'px'
            })

            $(".items1").last().css({
                "margin-right":0+'px'
            })

            //新增左右方向键、修改他们的属性
            $("<div class='left'>&lt;</div>").appendTo('.moveContainer');
            $("<div class='right'>&gt;</div>").appendTo('.moveContainer');

            $(".left").css({
                "width":50+'px',
                "height":height+'px',
                "font-size":20+'px',
                "color":"#fff",
                "text-align":"center",
                "line-height":height + 'px',
                "background-color":'rgba(0,0,0,0.5)',
                "position":"absolute",
                "top":50+'%',
                "transform":"translateY(-50%)"
            });
            $(".right").css({
                "width":50+'px',
                "height":height + 'px',
                "font-size":20+'px',
                "color":"#fff",
                "text-align":'center',
                "line-height":height+'px',
                "background-color":'rgba(0,0,0,0.5)',
                "position":'absolute',
                "top":50+'%',
                "right":0,
                "transform":"translateY(-50%)"
            });


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
                arrChange();
                focusChange();
                imgChange();
            });

            //方向控制轮播
            //-1 (0 1 2 3..) itemsLength(边界数字和数组长度相等)
            $(".right").on("click", function () {
                if (flag === 1) {
                    index += 1;
                    arrChange();

                    if (index === itemsLength - 1) {
                        focusChange(0);
                    } else {
                        focusChange();
                    }

                    //必须等动画完结之后，修改原始的引用参数
                    //因为动画尚未完成时修改原始引用参数，会产生另一个根据参数变化而生成的动画序列
                    //思路：动画进行到最后一张，动画完成后跳到第一张
                    //传入回调函数是为了：过渡到最后一张图片的动画存在
                    imgChange(function () {
                        if (index === (itemsLength - 1)) {
                            //瞬间置位
                            index = 0;
                            arrChange();

                            for (var i = 0; i < itemsLength; i++) {
                                (function () {
                                    var temp = i;
                                    $(".moveItems").eq(temp).stop().css({
                                        "left": parseInt(width * arr[temp]) + 'px'
                                    });
                                })();
                            }
                        }
                    });
                }
                flag = 0;
            });

            $(".left").on("click", function () {
                if (flag === 1) {
                    index -= 1;
                    if (index === -1) {
                        //瞬间切换到最后一张
                        index = itemsLength - 1;
                        arrChange();

                        for (var i = 0; i < itemsLength; i++) {
                            (function () {
                                var temp = i;
                                $(".moveItems").eq(temp).stop().css({
                                    "left": parseInt(width * arr[temp]) + 'px'
                                });
                            })();
                        }

                        //滑动到倒数第二张
                        index = (itemsLength - 2);
                        arrChange();
                        focusChange();
                        imgChange();
                    } else {
                        arrChange();
                        focusChange();
                        imgChange();
                    }
                }

                flag = 0;

            });

            setInterval(function () {
                flag = 1;
            }, 1000);

            /* 
                函数封装：
                1、arr转变
                2、焦点变化
                3、轮播图变化
            */

            function arrChange() {
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
                //没有接收到实参的形参，是undefined类型
                //index===4，paremeter=0
                if (parameter === 0) {
                    $(".items1").eq(parameter).css({
                        "background-color": "royalblue"
                    }).siblings().css({
                        "background-color": "rgba(0,0,0,0.5)"
                    });
                }
                else {
                    $(".items1").eq(index).css({
                        "background-color": "royalblue"
                    }).siblings().css({
                        "background-color": "rgba(0,0,0,0.5)"
                    });
                }
            }

            function imgChange(callback) {

                /* 选中所有items，根据变化数组得出具体left偏移 */

                for (var i = 0; i < itemsLength; i++) {
                    (function () {
                        var temp = i;
                        $(".moveItems").eq(temp).stop().animate({
                            "left": parseInt(width * arr[temp]) + 'px'
                        }, speed, callback);
                    })();
                }
            }


        }
    })
})(jQuery);
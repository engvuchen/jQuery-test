(function ($) {
    $.fn.extend({
        moveImg: function (width, height) {
            //---------变量---------
            var index = 0;
            var itemsLength = $(".items").length;
            var n = itemsLength; 
            var arr = [];
            var flag = 1;
            
            $(".container").css({
                "width": width,
                "height": height
            });

            //option = [url,url1,url2...]   

            //新增焦点容器，焦点、方向键
            $("<div class='nav'></div>").appendTo(".container");
            $(".nav").css({
                "z-index": 10
            })

            for (var i = 0; i < n; i++) {
                $("<div class='items1'></div>").appendTo(".nav");

                (function () {
                    var temp = i;
                    $(".items").eq(temp).css({
                        "width": 100+'%',
                        "height": 100+'%',
                        "left": temp * width + "px"
                    });
                })();
            }

            $("<div class='left'>&lt</div>").appendTo(".container");
            $("<div class='right'>&gt</div>").appendTo(".container");

            /* --------辅助函数---------- */
            
            for (var i = 0; i < n; i++) {
                arr[i] = i;
            }

            /* 
                函数封装：
                1、arr转变
                2、焦点变化
                3、轮播图变化
            */

            //改造了arrChange函数
            function arrChange(index) {
                /* 
                left在移动中的化简示例：
                 0 0,1,2,3
                 1 -1,0,1,2
                 2 -2,-1,0,1
                 3 -3,-2,-1,0
                */
                /* 1.对应位置置0
                    其他位置也加上它的计算
                */
                if (arr[index] === 0) { }
                else if (arr[index] > 0) {
                    //当数组这个位置不为0，执行一次-1
                    while (arr[index] != 0) {
                        for (var i = 0; i < arr.length; i++) {
                            arr[i] -= 1;
                        }
                    }
                }
                else if (arr[index] < 0) {
                    while (arr[index] != 0) {
                        for (var i = 0; i < arr.length; i++) {
                            arr[i] += 1;
                        }
                    }
                }

                return arr;
            }

            function focusChange() {
                $(".items1").eq(index).css({
                    "background-color": "royalblue"
                }).siblings().css({
                    "background-color": "rgba(0,0,0,0.5)"
                })
            }

            function imgChange() {
                for (var i = 0; i < itemsLength; i++) {
                    (function () {
                        var temp = i;
                        $(".items").eq(i).stop().animate({
                            "left": parseInt(width * arr[temp]) + 'px'
                        }, 700);
                    })();
                }
            }

            function action() {
                focusChange();
                arrChange(index);
                imgChange();
            }

            /* -------操作------- */

            //焦点轮播
            $(".items1").eq(0).css({
                "background-color": "royalblue"
            });

            $(".items1").hover(function () {
                index = $(this).index();
                action();
            });

            //方向控制
            //-1 (0 1 2 3) 4
            $(".right").on("click", function () {
                if (flag) {
                    index += 1;
                    // -1 0 .. n-1 n
                    if (index >= n) {
                        index = 0;
                        focusChange();
                        arrChange(index);
                        imgChange();
                    }
                    else {
                        action();
                    }
                    flag = 0;
                }
            });

            $(".left").on("click", function () {
                if (flag) {
                    index -= 1;
                    if (index < 0) {
                        //-1 (0...n-1) n
                        index = (n - 1);
                        arrChange(index);
                        //焦点变色
                        focusChange();
                        imgChange();
                    }
                    else {
                        action();
                    }
                    flag=0;
                }
            });

            setInterval(function () { flag = 1 }, 1500);
        }
    });
})(jQuery);
//效果：调整颜色，字号
//不传入参数有默认值
(function($){
    $.fn.extend({
      changeStyle:function(option){
        //设置默认值
        var defaultSetting={colorStr:"green", fontSize:20};
        //有参数传入就用传入参数替代默认值 
        var setting=$.extend(defaultSetting, option);
        this.css("color", setting.colorStr)
        .css("fontSize", setting.fontSize+"px");
       return this;
      }
    })
  })(jQuery);

//extend：将插件挂载到$选择的元素上
(function($){
  $.fn.extend({
    changeSomthing:function(){
      return this;
    }
  });

})(jQuery);

//直接挂载到$选择的方式上；暂时不知道两者的区别，但是建议适用第一种
(function(){
  $.fn.changeXX = function(){
    //....
  }
})(jQuery);


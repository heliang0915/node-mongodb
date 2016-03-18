/*后台公共js*/
$(function(){
    //公共对象
    var common = {
        init: function () {
            this.setActive();
            this.reCalculated();
            this.initEvent();
        },
        reCalculated: function () {  //重新计算中间区域高度和宽度
            var winHeight = $(window).height();
            var topHeight = $('.top').outerHeight() + 3;
            var contentHeight = winHeight - topHeight;
            var leftDom = $('.left-column');

            var left = leftDom.width();
            var right = $(window).width() - left + 12;
            leftDom.height(contentHeight);
            $('iframe').width(right);
            $('iframe').height(contentHeight);
        },
        setActive: function () {
            try{
                $('.nav').find('a:eq(' + pageIndex + ')').addClass('active').siblings().removeClass('active');
            }catch(e){}
        },
        initEvent:function(){ //初始化事件
            this.initAcc();
        },
        initAcc:function(){ //设置手风琴事件
            $(".call").children("div").on('click',function(){
                var className=$(this).attr('class');
                var otherClassName="down";
                className=(className=="down"?"up":"down");
                otherClassName=(otherClassName=="down"?"up":"down");
                $(this).attr('class',className).parent().siblings().children("div").attr('class',otherClassName)
            })
        }
    }
    common.init();
});

define([],function(){

});






require(['tab', 'banner'], function (Tab, Banner) {  //
    var data = ["/download/1.jpg", "/download/2.jpg", "/download/3.jpg", "/download/4.jpg", "/download/5.jpg"];
    var hrefAry = ["http://www.baidu.com", "http://www.hao123.com", "http://www.sina.com"];
    var oBan = document.getElementById("banner");
    var ban = new Banner({
        //必填
        selector: oBan,
        dataAry: data, //焦点图数据json结构
        hrefAry: hrefAry,
        isSwipe: true,
        isAuto: true
    });

    var t2 = new Tab({
        id: 'tab2',
        index:0,
        behaviour:'hover'
    });




    //购物车动画
    $('.shop-car').rotate({
        bind: {
            mouseenter: function () {
                $(this).find('em').rotate({animateTo: 180, duration: 400});
            }, mouseleave: function () {
                $(this).find('em').rotate({animateTo: 0, duration: 400});
            }
        }
    });

    /*控制菜单项显示隐藏*/
    $('.menu-list').find('li').mouseenter(function () {
        appendMenu();
        $('.menu-content').show();

    });
    $('.menu-content').mouseenter(function () {
        appendMenu();
        $('.menu-content').show();
    });
    $('.menu-content').mouseleave(function () {
        appendMenu();
        $('.menu-content').hide();
    });
    $('.menu-list').find('li').mouseleave(function () {
        appendMenu();
        $('.menu-content').hide();
    });

    /*追加html*/
    function appendMenu() {
        var html = renderMenuItem();
        $('.menu-content').html(html);
    }

    /*获取菜单项html*/
    function renderMenuItem() {
        var html = '';
        html += '<div class="menu-item">';
        html += '	<h4>';
        html += '<a href="#">平板专场</a>';
        html += '</h4>';
        html += '<ul>';
        html += '<li><a href="">ipad</a></li>';
        html += '<li><a href="">surface</a></li>';
        html += '<li><a href="">kindle</a></li> ';
        html += '<li><a href="">三星平板</a></li>';
        html += '<li><a href="">先锋平板</a></li>';
        html += '<li><a href="">联想平板</a></li>';
        html += '<li><a href="">388元抢华为平板</a></li>';
        html += '<li><a href="">平板配件</a></li>';
        html += '<li><a href="">平板配件</a></li>';
        html += '<li><a href="">平板配件</a></li>';
        html += '<li><a href="">平板配件</a></li>';
        html += '<li><a href="">平板配件</a></li>';
        html += '<li><a href="">平板配件</a></li>';
        html += '<li><a href="">平板配件</a></li>';
        html += '</ul>';
        html += '</div>';
        return html;
    }

})
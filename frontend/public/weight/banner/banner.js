//author:heliang
//banner
define(['text!./banner.css'], function (cssText) {
    //var effect='easeOutBounce';
    var effect='easeOutBounce';
    var styleEl = document.getElementById('banner-style');
    var defaultDirection = "landscape";
    var defaultImg = "data:image/png;base64,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";
    if (styleEl) {
        var con = $(styleEl).html();
        $(styleEl).remove();
        $('head').append('<style type="text/css" id="banner-style">' + con + cssText + '</style>');
    } else {
        $('head').append('<style type="text/css" id="banner-style">' + cssText + '</style>');
    }
    var bannerLeft = '<span class="banner-block banner-left"></span>';
    var bannerRight = '<span class="banner-block banner-right"></span>';
    //定义构造函数
    var Banner = function (opts) {
        var banner = new Banner.init(opts);
        banner.$init();
        return banner;
    }
    //初始化参数
    Banner.init = function (opts) {
        //渲染的元素
        this.selector = opts.selector;
        //数据数组
        this.dataAry = opts.dataAry || [];
        //链接数组
        this.hrefAry = opts.hrefAry || [];
        //跳转的步数
        this.step = opts.step || 0;
        //定时器
        this.timer = opts.timer || null;
        //是否自动播放
        this.isAuto = (opts.isAuto == false ? false : true);
        //是否显示左右箭头
        this.isArrow = (opts.isArrow == false ? false : true);
        //是否显示小原点
        this.isTip = opts.isTip || true;
        //默认图片
        this.defaultImg = opts.defaultImg || defaultImg;// "default.png";
        //延迟时间
        this.delayTime = opts.delayTime || 3000;
        //滚动方向
        this.direction = opts.direction || defaultDirection;
        //定义一个定时器队列
        this.timerArray = [];

    }
    Banner.fn = Banner.prototype = Banner.init.prototype;
    //初始化行为
    Banner.fn.$init = function () {
        this.initData();
        this.initStyle();
        if (this.isAuto) {
            this.initAuto();
        }
        this.initEvent();
    };
    //初始化数据
    Banner.fn.initData = function () {
        var _this = this, selector = _this.selector;
        selector.innerHTML = _this.renderHTML();
        window.setTimeout(function () {
            _this.loadImg();
        }, 0);
    };
    //渲染HTML模版
    Banner.fn.renderHTML = function () {
        var data = this.dataAry,
            hrefAry = this.hrefAry,
            html = "";
        html += "<div class='scroll' >"  //style='left:-"+left+"px;'
        for (var i = 0; i < data.length; i++) {
            var href = hrefAry[i];
            html += "<a target='_blank' href='" + (href == undefined ? "###" : href) + "'>"
            html += "<img src='" + this.defaultImg + "' trueImg='" + data[i] + "'/>";
            html += "</a>"
        }
        //多计算一下第一张
        html += "<img src='" + this.defaultImg + "' trueImg='" + data[0] + "'/>";
        html += "</div>";
        if (this.isTip) {
            html += "<ul>";
            for (i = 0; i < data.length; i++) {
                html += "<li data-index='" + (i) + "' class='li-item'>" + (i + 1) + "</li>";
            }
            html += "</ul>";
        }
        //是否显示左右箭头
        if (this.isArrow) {
            html += bannerLeft;
            html += bannerRight;
        }
        return html;
    }
    //懒加载图片
    Banner.fn.loadImg = function () {
        var _this = this,
            selector = _this.selector,
            imgList = $(selector).find("img");
        imgList.each(function (i) {
            var self = this;
            var oImg = new Image;
            oImg.onload = function () {
                $(self).attr('src', $(oImg).attr('src'));
                oImg = null;
            }
            oImg.src = $(this).attr('trueImg');//   imgList[i].getAttribute("trueImg");
        });
    };
    //让指定元素选中
    Banner.fn.checkOne = function (index) {
        index = parseInt(index);
        var _this = this,
            selector = _this.selector,
            tipLis = $(selector).find("li");
        if (_this.isTip) {
            tipLis.each(function (i) {
                if (index === i) {
                    //console.log(i);
                    $(this).addClass("active").siblings().removeClass("active");
                }
            });
            if (index == tipLis.length) {
                $(selector).find("li:first").addClass("active").siblings().removeClass("active");
            }
            if (index < 0) {
                $(selector).find("li:last").addClass("active").siblings().removeClass("active");
            }
        }
    };
    Banner.fn.initStyle = function () {
        var _this = this;
        var selector = _this.selector,
            clientW = selector.clientWidth,
            clientH = selector.clientHeight;
        var scroll = $(selector).find(".scroll:first"),
            imgList = $(scroll).find("img");
        _this.setScroll(clientW, clientH, scroll, imgList);
        _this.setImg(clientW, clientH, imgList);
        if (_this.isTip) {
            var tip = $(selector).find("ul:first"), tipLis = $(tip).find("li");
            _this.setTipLi(tipLis);
            _this.checkOne(0);
        }
    };
    //设置滚动区域样式
    Banner.fn.setScroll = function (clientW, clientH, scroll, imgList) {
        $(scroll).css({
            position: "absolute",
            top: 0,
            left: 0,
            width: clientW * imgList.length,
            height: clientH
        });
    };
    //设置图片样式
    Banner.fn.setImg = function (clientW, clientH, imgList) {
        var float = this.getAttrByDirection() == "left" ? "left" : "none";
        for (var i = 0; i < imgList.length; i++) {
            $(imgList[i]).css({
                display: "block",
                float: float,
                width: clientW,
                height: clientH
            });
        }
    };
    Banner.fn.setTipLi = function (tipLis) {
        var float = this.getAttrByDirection() == "left" ? "left" : "none";
        tipLis.each(function () {
            $(this).css({
                display: "block",
                float: float
            })
        })
    }
    //初始化自动滚动
    Banner.fn.initAuto = function () {
        var _this = this;
        var selector = _this.selector,
            imgList = $(selector).find("img"),
            scroll = $(selector).find(".scroll:first");
        var increment = this.getIncrement();
        //清空全部定时器
        _this.clearTimers();
        _this.timer = window.setInterval(function () {
            //console.time("a");
            var attr = _this.getAttrByDirection();
            var data = {};
            if (_this.step >= imgList.length - 1) {
                _this.step = 0;
                scroll.css(attr, 0);
                _this.checkOne(0);
            }
            _this.step++;
            data[attr] = -_this.step * increment;
            //console.log(scroll);
            scroll.stop().animate(data, {
                easing: effect,
                duration: _this.delayTime / 3
            });

            _this.checkOne(_this.step);
            //console.timeEnd("a");
        }, _this.delayTime);
        //向队列中插入定时器编号
        _this.timerArray.push(_this.timer);
    };
    //清除队列中的定时器数据
    Banner.fn.clearTimers = function () {
        for (var i = 0; i < this.timerArray.length; i++) {
            var timer = this.timerArray[i];
            window.clearTimeout(timer);
            this.timerArray.shift();
        }
    }
    ////根据方向获取要设置的属性
    Banner.fn.getAttrByDirection = function () {
        return (this.direction == defaultDirection ? "left" : "top");
    }

    //获取每次的增量
    Banner.fn.getIncrement = function () {
        var increment = 0;
        var attr = this.getAttrByDirection();
        if (attr == "left") {
            increment = this.selector.clientWidth;
        } else {
            increment = this.selector.clientHeight;
        }
        return increment;
    }
    //初始化滑动事件
    Banner.fn.initEvent = function () {
        var _this = this;
        var selector = _this.selector,
            imgList = $(selector).find("img"),

            scroll = $(selector).find(".scroll:first");
        var attr = _this.getAttrByDirection();
        var increment = this.getIncrement();
        $('.li-item').on('click', function () {
            var index = $(this).attr('data-index');
            _this.step = index;
            swipeChang.call(_this);
        })

        //左右箭头注册事件
        if (this.isArrow) {
            $('.banner-left').on('click', function () {
                _this.step--;
                swipeChang.call(_this);
            })
            $('.banner-right').on('click', function () {
                _this.step++;
                swipeChang.call(_this);
            })
        }
        //根据滑动方向改变
        function swipeChang() {
            var _this = this;
            var temp;
            var data = {};
            var scroll = $(selector).find(".scroll:first");
            //清空全部定时器
            this.clearTimers();
            if (this.step >= imgList.length) { //点击右边的箭头
                this.step = 0;
                $(scroll).css(attr, 0);
                this.step++;
            }
            if (this.step < 0) { //点击左边的箭头
                this.step = imgList.length - 2;
                $(scroll).stop();
                $(scroll).css(attr, -(imgList.length - 1) * increment);
            }

            this.checkOne(_this.step);
            data[attr] = -this.step * increment;
            if (!(this.step >= imgList.length)) {
               // $(scroll).stop().animate(data, _this.delayTime / 3);
                $(scroll).stop().animate(data, {
                    easing: effect,
                    duration: _this.delayTime / 3
                });
            }
            temp = window.setTimeout(function () {
                _this.isAuto ? _this.initAuto() : null;
                window.clearInterval(temp);
            }, 1000);
        }
    };
    return Banner;
});
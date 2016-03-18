//定义业务模块
define(["util", "page", "lay"], function (util, pagination, layer) {
    var business = {
        init: function (pageParams, eventCallback, initCallBack) {
            if (initCallBack && typeof initCallBack == "function") {
                initCallBack();
            }
            this.initPage(pageParams.url, pageParams.data, pageParams.callback);
            this.initStyle();
            this.initEvent(eventCallback);
        },
        initStyle: function () {
            $(".toolbar, .content, .footer").css("width", "98%");
        },

        initEvent: function (eventCallback) { //初始化事件
            if (eventCallback && typeof eventCallback == "function") {
                eventCallback.call(this);
            }
            //增删改查公共的处理
            //$('#add').on('click', function () {
            //    this.add();
            //})
            //
            //$('#edit').on('click', function () {
            //    this.edit();
            //})

            $('#del').on('click', function () {
                this.del();
            })
        },
        initPage: function (url, params, callback) {
            pagination("pagination", {
                num_entries: totalPage,
                num_edge_entries: 1, //边缘页数
                num_display_entries: 4, //主体页数
                callback: pageselectCallback,
                items_per_page: 1, //每页显示1项
                prev_text: "前一页",
                next_text: "后一页"
            });
            //分页回调
            function pageselectCallback(page_index, jq) {
                if (url) {
                    params = params == undefined ? params : {};
                    params.currentPage = page_index + 1;
                    util.ajax(url, callback, params)
                }
                return false;
            }
        },
        //add: function (data) {
        //    this.operation('/add', data);
        //},
        //edit: function (data) {
        //    this.operation('/edit', data);
        //},
        del: function () {
            var data = {};
            var str = "";
            $('input[name="check"]:checked').each(function (i) {
                var uuid = $(this).val();
                if (i == 0) {
                    str += uuid;
                } else {
                    str += "," + uuid;
                }
            });
            data.uuid = str;
            this.operation('/del', data);
        },
        operation: function (url, data, callback) {
            util.ajax(url, function (data) {
                if (callback && typeof callback == "function") {
                    callback(data);
                }
            }, data);
        }
        ,
        openDialog: function (config) {
            config = (config == undefined ? {} : config);
            var width = [];
            for (var i in config.area) {
                width.push(config.area[i] + "px");
            }
            var area = width.length > 0 ? width : ['600px', '420px'];
            layer.open({
                type: config.type||1,
                title: config.title || '提示',
                maxmin: config.maxmin || false,
                shadeClose: config.shadeClose == false ? true : false, //点击遮罩关闭层
                area:area,
                content: config.content || '内容',
                btn: ['保存', '取消'] //只是为了演示
                ,yes: function(){
                    if(config.okCallback&&typeof config.okCallback=="function" ){
                        config.okCallback();
                    }
                }
                ,btn2: function(){
                    if(config.cancelCallback&&typeof config.cancelCallback=="function" ){
                        config.cancelCallback();
                    }
                }
            });
        }
    }
    return business;
});
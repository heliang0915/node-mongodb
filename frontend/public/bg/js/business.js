/**
 * 公共业务模块 负责页面上的 增 删 改 查 操作
 */
define(["util", "page", "lay"], function (util, pagination, layer) {
    var business = {
        init: function (pageParams,initCallBack) {
            if (initCallBack && typeof initCallBack == "function") {
                initCallBack();
            }
            this.initPage(pageParams.url, pageParams.data, pageParams.callback);
            this.initStyle();
            this.initEvent();
        },
        initStyle: function () {
            $(".toolbar, .content, .footer").css("width", "98%");
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
                    params = params == undefined ?{}: params ;
                    params.currentPage = page_index + 1;
                    util.ajax(url, callback, params)
                }
                return false;
            }
        },
        initEvent:function(){
            $("#selectAll").off('click').on('click',function(){
                var check=$(this).is(":checked");
                $("input[name='check']").prop("checked",check);
            });
        },
        del: function (path,callback) {
            var _this=this;
            var data = {};
            var str = "";
            var checks=$('input[name="check"]:checked');
            if(checks.length==0){
                layer.msg("请选择一条记录",{time:1500,icon:0});
                return false;
            }
            checks.each(function (i) {
                var uuid = $(this).val();
                if (i == 0) {
                    str += uuid;
                } else {
                    str += "," + uuid;
                }
            });
            data.uuid = str;
            //询问框
            layer.confirm('您确认删除吗？', {
                btn: ['确认','取消'] //按钮
            }, function(){
                _this.operation('/'+path+'/del', data,callback);
            });
        },
        operation: function (url, data, callback) {
            util.ajax(url, function (data) {
                if (callback && typeof callback == "function") {
                    var msg=data.msg;
                    var state=data.state;
                    var icon=(state=="ok"?6:5);
                    layer.msg(msg, {time: 1200, icon:icon});
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
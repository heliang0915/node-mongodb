require(['business', 'util','lay'], function (business, util,layer) {
    //lay.load();
    //layer.msg('玩命提示中');
    //layer.open({
    //    type: 2,
    //    title: 'iframe父子操作',
    //    maxmin: true,
    //    shadeClose: true, //点击遮罩关闭层
    //    area : ['800px' , '520px'],
    //    content: 'http://www.baidu.com'
    //});
    //
    ////询问框
    //layer.confirm('您是如何看待前端开发？', {
    //    btn: ['重要','奇葩'] //按钮
    //}, function(){
    //    layer.msg('的确很重要', {icon: 1});
    //}, function(){
    //    layer.msg('也可以这样', {
    //        time: 20000, //20s后自动关闭
    //        btn: ['明白了', '知道了']
    //    });
    //});

    //加载层
    //var index = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
    // layer.msg('加载中...', {icon: 16});


    var member = {};
    //浅拷贝
    member = util.extends(business, member);
    //分页回调
    var pageParams = {};
    pageParams.url = "/member/page";
    pageParams.data = {};

    pageParams.callback = function (data) {
        //分页回调
        var showFileds = {"userName": "", "tel": "", "rank": "", "email": "", "sex": ""}
        var html = "";
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            html += "<tr>";
            html += '<td><input type="checkbox" name="check"></td>';
            for (var file in showFileds) {
                html += "<td>";
                html += item[file];
                html += "</td>";
            }
            html += '<td class="opt"><a href="###">&#xe609;</a></td>';
            html += "</tr>";
        }
        $("#record").html(html)
    }


    var eventCallback = function () {
        var _this=this;
        $('#add').on('click', function () {

            _this.openDialog({
                type:2,
                content:'/member/modify',
                okCallback:function(){
                    alert("ok");
                },
                cancelCallback:function(){
                    alert("取消");
                }
            });
        })

        $('#del').on('click', function () {
            alert(self);
        })
    }
    //初始化
    member.init(pageParams, eventCallback);
});


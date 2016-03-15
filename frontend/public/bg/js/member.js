require(['util', 'page'], function (util, pagination) {

    window.pageselectCallback = function (index, jq) {
        alert(index);
    }

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
    //// 创建分页

    //


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
        var url = "/member/page";
        util.ajax(url, function (data) {
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
        }, {
            currentPage: page_index + 1
        })
        //var new_content = $("#hiddenresult div.result:eq("+page_index+")").clone();
        //$("#Searchresult").empty().append(new_content); //装载对应分页的内容
        return false;
    }

    $(".toolbar, .content, .footer").css("width", "96%");
});


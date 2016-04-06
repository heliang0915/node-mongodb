require(['business', 'util', 'lay', 'common'], function (business, util, layer, common) {
    var producttype = {};
    //分页回调
    var pageParams = {};
    pageParams.url = "/producttype/page?temp=" + Math.random();
    pageParams.data = {};
    //JSON.stringify(data);
    //浅拷贝
    producttype = util.extends(business, producttype);
    //事件回调
    var eventCallback = function () {
        var _this = this;
        //添加动作
        $('#add').on('click', function () {
            window.location.href = "/producttype/modify";
        })
        //修改动作
        $('a[name=modify]').on('click', function () {
            var uuid = $(this).attr('data');
            window.location.href = "/producttype/modify?uuid=" + uuid;
        })
        //删除动作
        $('#del').on('click', function () {
            producttype.del("producttype", function () {
                window.location.href = "/producttype/list";
            });
        })
        //重置复选框
        $("#selectAll").prop("checked", false);
        //设置复选框
        $("input[name='check']").off('click').on('click', function () {
            if ($("input[name='check']").length == ($("input[name='check']:checked").length)) {
                $("#selectAll").prop("checked", true);
            } else {
                $("#selectAll").prop("checked", false);
            }
        });

        //注册修改 属性 参数 关联品牌 关联规格
        $('a[name^="modify_"]').on('click', function () {
            var fileName = $(this).attr("data-name");
            var uuid = $(this).attr("data");
            var title = "";
            var url = "";
            var index=0;
            switch (fileName) {
                case "attr":
                    title="属性";
                    url = "";
                    break;
                case "params":
                    title="参数";
                    url = "";
                    index=1;
                    break;
                case "brand":
                    title="关联品牌";
                    url = "";
                    index=2;
                    break;
                case "specifications":
                    title="关联规格";
                    url = "";
                    index=3;
                    break;
            }
            openOptDialog(title,url,index);
        })
    }


    //分页回调
    pageParams.callback = function (json) {
        var data = json.data;
        //分页回调
        var showFileds = {"typeName": "", "attr": "", "params": "", "brand": "", "specifications": ""}
        var html = "";
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            html += "<tr>";
            html += '<td><input type="checkbox" name="check" value="' + item.uuid + '"></td>';
            for (var file in showFileds) {
                var text = "无";
                if (file != "typeName") {
                    html += '<td class="opt">';
                    var fileName = "is" + common.toFirstUpper(file);
                    if (item[fileName]) {
                        text = '<a href="###" data="' + item.uuid + '" data-name="' + file + '" name="modify_' + file + '">&#xe60a;</a>';
                    }
                } else {
                    html += "<td>";
                    text = item[file];
                }
                html += text;
                html += "</td>";
            }
            html += '<td class="opt"><a href="###" data="' + item.uuid + '" name="modify" >&#xe609;</a></td>';
            html += "</tr>";
        }
        $("#record").html(html);
        eventCallback.call(this);
    }

    //打开操作对话框
    function openOptDialog(title, url,index) {
        title = "["+title+"] 对话框";

        var w='800px';
        var h='350px';
        if(index==2||index==3){
            w='500px';
            h='300px';
        }

        layer.open({
            type: 2,
            title: title,
            area: [w, h],
            content: '/producttype/relationspec?type='+index,
            btn: ['保存', '取消'],
            yes: function () {
                alert('保存');
            },
            btn2: function () {
                layer.closeAll();
            },
            success: function (layero) {

            }
        });
    }
    //初始化
    producttype.init(pageParams);
});


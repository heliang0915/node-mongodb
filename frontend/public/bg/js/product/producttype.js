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
            var uuids = $(this).attr('data-val');
            uuids == undefined ? "" : uuids;
            var title = "";
            var url = "";
            var index = 0;
            switch (fileName) {
                case "attr":
                    title = "属性";
                    url = "";
                    break;
                case "params":
                    title = "参数";
                    url = "/productparams?ref="+uuid;
                    index = 1;
                    break;
                case "brand":
                    title = "关联品牌";
                    index = 2;
                    url = '/producttype/relationspec?type=' + index + "&uuids=" + uuids + "&uuid=" + uuid;
                    break;
                case "specifications":
                    title = "关联规格";
                    index = 3;
                    url = '/producttype/relationspec?type=' + index + "&uuids=" + uuids + "&uuid=" + uuid;
                    break;
            }

            producttype.openOptDialog(title, url, index, uuid, uuids);
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
                        text = '<a href="###" data="' + item.uuid + '" data-val="' + item[file] + '" data-name="' + file + '" name="modify_' + file + '">&#xe60a;</a>';
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
    producttype.openOptDialog = function (title, url, index, uuid, uuids) {
        var _this = this;
        //uuids==undefined?"":uuids;
        title = "[" + title + "] 对话框";

        var w = '600px';
        var h = '350px';
        if (index == 2 || index == 3) {
            w = '500px';
            h = '300px';
        }
        layer.open({
            type: 2,
            title: title,
            area: [w, h],
            content: url,
            btn: ['保存', '取消'],
            yes: function () {
                if (index == 2 || index == 3) {
                    var uuids = _this.getSelectedUUIDS();
                    if (uuids == "") {
                        layer.msg("亲,请选择一条记录~~~", {time: 2000, icon: 0});
                        return;
                    }
                    var data = {};
                    var url = "/producttype/saveUUID";
                    data.uuids = uuids;
                    data.type = index;
                    data.uuid = uuid;
                    _this.save(url, data, function () {
                        var iframe = $('iframe');
                        var win = iframe[0].contentWindow;
                        win.uuids = uuids;

                    });
                } else if (index == 1) {
                    var iframe = $('iframe');
                    var win = iframe[0].contentWindow;
                    var data= win.save(uuid);

                    //alert(win.save);
                }

            },
            btn2: function () {
                layer.closeAll();
            },
            success: function (layero) {

            }
        });
    }
    //获取uuids
    producttype.getSelectedUUIDS = function () {
        var iframe = $('iframe');
        var win = iframe[0].contentWindow;
        var options = $(win.document.getElementById('toList')).find("option");
        var uuidAry = [];
        options.each(function () {
            var uuid = $(this).val();
            uuidAry.push(uuid);
        });
        var uuids = uuidAry.join(",");
        return uuids;
    }

    //保存方法 品牌 / 规格 将规格或品牌的uuid保存到数据库中
    producttype.save = function (url, data, callback) {
        callback = (typeof callback == "function" ? callback : function () {
        });
        util.ajax(url, function (json) {
            var msg = json.msg;
            var state = json.state;
            var icon = (state == "ok" ? 6 : 5);
            layer.msg(msg, {time: 2000, icon: icon});
            if (state == "ok") {
                setTimeout(function () {
                    layer.closeAll();
                }, 2000);
            }
            callback();
        }, data);

    }


    //初始化
    producttype.init(pageParams);
});


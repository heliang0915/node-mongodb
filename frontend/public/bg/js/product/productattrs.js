require(['business', 'util', 'lay'], function (business, util, layer) {
    var productattrs = {};
    //分页回调
    var pageParams = {};
    pageParams.url = "/manager/productattrs/page?temp=" + Math.random();
    pageParams.data = {};
    //JSON.stringify(data);
    //浅拷贝
    productattrs = util.extend(business, productattrs);
    //事件回调
    var eventCallback = function () {
        var _this = this;
        //添加动作
        $('#add').on('click', function () {
            var template=$('#template');
            var templateHtml=template.html();
            productattrs.openDialog({
                area:['550','350'],
                title:'添加属性',
                content:templateHtml,
                okCallback:function () {
                    productattrs.save();
                   // alert(1);
                }
            });
        })
        //修改动作
        $('a[name=modify]').on('click', function () {
            var uuid = $(this).attr('data');
            productattrs.openDialog({
                area:['550','300'],
                title:'修改属性'
            });
            //window.location.href = "/manager/productattrs/modify?uuid=" + uuid;
        })
        //删除动作
        $('#del').on('click', function () {
            productattrs.del("productattrs", function () {
                window.location.href = "/manager/productattrs/list";
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
        })
    }

    //分页回调
    pageParams.callback = function (json) {
        var data = json.data;
        //分页回调
        var showFileds = { "attrName": "", "type": "", "attrSelectItem": "", "unit": "","isrequire": "","isvalidate": ""}
        var html = "";
        for (var i =0; i < data.length; i++) {
            var item = data[i];
            html += "<tr>";
            html += '<td><input type="checkbox" name="check" value="' + item.uuid + '"></td>';
            for (var file in showFileds) {
                var text = "";
                html += "<td>";
                text = item[file];
                if (file == "isShow") {
                    text = text == 1 ? "是" : "否";
                }
                if (file == "typeName") {
                    text = text != "" ? text : "无";
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
    productattrs.save=function () {
        var uuid=$('#uuid').val();
        var url="/manager/productattrs/save";
        var params={};
        var form=$('#form');

        params.attrName=$('.form-group').find('input[name="attrName"]:visible').val();
        params.unit=$('.form-group').find('input[name="unit"]:visible').val();
        params.attrSelectItem=$('.form-group').find('input[name="attrSelectItem"]:visible').val();
        params.type=$('.form-group').find('select[name="type"]:visible').val();
        params.isrequire=$('.form-group').find('input[name="isrequire"]:visible').val();
        params.isvalidate=$('.form-group').find('input[name="isvalidate"]:visible').val();
        params.ref=uuid;

        util.ajax(url,function (data) {
            alert(data);
        },params);
    }
    //初始化
    productattrs.init(pageParams);

});


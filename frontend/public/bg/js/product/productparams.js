require(['business', 'util', 'lay', 'json2'], function (business, util, layer) {
    var productparams = {};
    var groupIndex = $('input[name^="group_"]').length;
    var itemIndex = 0;

    productparams.init = function () {
        this.initEvent();
    }
    //定义事件
    productparams.initEvent = function () {
        var self = this;
        //新增参数组
        $('#addGroup').on('click', function () {
            var groupHtml = self.renderGroupHtml(groupIndex++);
            $('.content').append($(groupHtml));
            itemIndex = 0;
            self.addItemEvent();
        })

        $('.remove_group').on('click', function () {
            var dataAttr = $(this).parent().prev().find('input').attr('data-attr');
            $(this).parent().parent().remove();
            $('input[data="' + dataAttr + '"]').parent().parent().remove();
        })

        $('.remove').on('click', function () {
            $(this).parent().parent().remove();
        });

        //this.addItemEvent();

    }

    //参数组
    productparams.renderGroupHtml = function (groupIndex) {
        var groupHTML = '';
        groupHTML += "<dl class='attr-table attr-group'>\n ";
        groupHTML += " <dt>参数组名</dt> \n ";
        groupHTML += "<dd><input type='text' name='group_" + groupIndex + "' data-attr='group_" + groupIndex + "'></dd> \n ";
        groupHTML += "<dd class='w25'> \n ";
        groupHTML += "<a class='f16' href='###' class='addAttr' data-attr='" + groupIndex + "' >新增参数</a> \n ";
        groupHTML += "<a href='###' class='remove_group'>&#xe60b;</a>\n ";
        groupHTML += "</dd> \n ";
        groupHTML += "</dl>\n ";
        return groupHTML;

    }
    //参数名
    productparams.renderItemHtml = function (groupIndex, itemIndex) {
        var itemHTML = "";
        itemHTML += "<!--参数项--> \n";
        itemHTML += " <dl class='attr-table'> \n";
        itemHTML += " <dt>参数名</dt> \n";
        itemHTML += " <dd><input name='item_" + groupIndex + "_" + itemIndex + "'  data='group_" + groupIndex + "' type='text'></dd> \n";
        itemHTML += " <dd class='w25'> \n";
        itemHTML += " <a class='remove' href='###'>&#xe60b;</a> \n";
        itemHTML += " </dd> \n";
        itemHTML += " </dl> \n";
        return itemHTML;
    }

    //添加参数事件
    productparams.addItemEvent = function () {
        var self = this;
        $('a[data-attr]').off('click').on('click', function () {
            var groupInd = parseInt($(this).attr("data-attr"));
            var groupHtml = self.renderItemHtml(groupInd, itemIndex++);
            $('.content').append($(groupHtml));
        })
    }


    productparams.init();

    //保存方法
    var save = function (refuuid) {
        var data = {};
        $('input[name^="group_"]').each(function () {
            var groupVal = $(this).val();
            var dataAttr = $(this).attr('data-attr');
            var paramsVals = [];
            $('input[data="' + dataAttr + '"]').each(function () {
                var val = $(this).val();
                if (val) {
                    paramsVals.push(val);
                }
            });
            if (paramsVals.length > 0) {
                data[groupVal] = paramsVals;
            }

        });

        var datas = {};
        var uuid = $('#uuid').val();

        datas.params = JSON.stringify(data);
        datas.ref = refuuid;
        datas.uuid = uuid;
        var url = "/productparams/save";
        util.ajax(url, function (json) {
            var msg = json.msg;
            var state = json.state;
            var icon = (state == "ok" ? 6 : 5);
            layer.msg(msg, {time: 2000, icon: icon});
            //if (state == "ok") {
            //
            //}

        }, datas);

        console.log(data);
        return data;
    }

    window.save = save;
});



require(['lay'], function (layer) {
    var relation = {};
    relation.init = function () {
        this.initEvent();
        this.showUUID();
    }

    //注册事件
    relation.initEvent = function () {
        //添加选项
        $('#add').on('click', function () {
            var selectNode = $('#formList').children('option:selected');
            var toSelectedNode = $('#toList').children('option');
            if (selectNode.length > 0) {
                selectNode.each(function () {
                    var has = relation.hasSelectItem(toSelectedNode, $(this));
                    var cloneNode = $(this).clone();
                    if (!has) {
                        $('#toList').append(cloneNode);
                    }
                });

            } else {
                layer.msg("亲,需要先选择要添加的选项哦~~~", {time: 2000, icon: 0});
            }
        });

        //移除指定项
        $('#remove').on('click', function () {
            var selectedNode = $('#toList').children('option:selected');
            if (selectedNode.length > 0) {
                selectedNode.remove();
            } else {
                layer.msg("亲,需要先选择要移除的选项哦~~~", {time: 2000, icon: 0});
            }

        })
        //清除所有
        $('#removeAll').on('click', function () {
            if ($('#toList').children().length > 0) {
                $('#toList').children().remove();
            } else {
                layer.msg("亲,当前列表中已经为空咯~~~", {time: 2000, icon: 0});
            }

        });
    }

    //检测是列表中有该项
    relation.hasSelectItem = function (list, item) {
        var has = false;
        list.each(function () {
            var val = $(this).val();
            if (val == item.val()) {
                has = true;
                return;
            }
        });
        return has;
    }

    //回显数据
    relation.showUUID = function () {

        if (uuids) {
            var ary = [];
            if (uuids.indexOf(',') > -1) {
                ary = uuids.split(',');
            } else {
                ary.push(uuids);
            }
            var toList = $("#toList");
            var fromListOptions = $("#formList").find('option');

            for (var i = 0; i < ary.length; i++) {
                var dom;
                var uuid = ary[i];
                fromListOptions.each(function () {
                    var val = $(this).val();
                    if (uuid == val) {
                        dom = $(this).clone();
                        return;
                    }
                });
                if (dom.length > 0) {
                    toList.append(dom);
                }
            }
        }

    }
    relation.init();

});
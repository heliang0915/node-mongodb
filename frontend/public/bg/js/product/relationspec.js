require(['lay'], function (layer) {

    var relation = {};

    relation.init = function () {
        this.initEvent();

    }

    //注册事件
    relation.initEvent = function () {
        //添加选项
        $('#add').on('click', function () {
            $('#formList:selected').each(function () {
                var has = this.hasSelectItem($('#toList'), $(this));
                if (!has) {
                    $('#toList').append($(this));
                }
            });
        });

        //移除指定项
        $('#remove').on('click', function () {
            if ($('#toList:selected').length > 0) {
                $('#toList:selected').remove();
            } else {
                layer.msg("亲,需要先选择要移除的选项哦~~~", {time: 1200, icon: 5});
            }

        })
        //清除所有
        $('#removeAll').on('click', function () {
            if ($('#toList').children().length > 0) {
                $('#toList').children().remove();
            } else {
                layer.msg("亲,当前列表中已经为空咯~~~", {time: 1200, icon: 5});
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


    relation.init();

});
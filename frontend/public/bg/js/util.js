define(['lay'], function (layer) {
    var util = {};
    //ajax
    util.ajax = function (url, callback, params) {
        //加载loadding
        layer.load(0, {shade: false});
        params = params == undefined ? {} : params;

        $.ajax({
            type: 'post',
            url: url,
            data: params,
            dateType: 'json',
            success: function (data) {

                callback(data);
                layer.closeAll('loading');
            },
            error: function () {
                layer.msg("失败了");
            }
        })
    }

    //渲染grid
    util.renderGrid=function(){

    }


    return util;
});
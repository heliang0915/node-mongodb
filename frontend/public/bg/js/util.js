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
                if(callback&&typeof callback =="function"){
                    callback(data);
                }
                layer.closeAll('loading');
            },
            error: function () {
                layer.msg("失败了");
            }
        })
    }

    //属性拷贝
    util.extends=function(_old,_new){
        for(var key in _old){
            if(!Object.hasOwnProperty(key)) continue;
            _old[key]=_new[key];
        }
        return _old;
    }
    return util;
});
define(['lay'], function (layer) {
    var util = {};
    //ajax
    util.ajax = function (url, callback, params) {
        //加载loadding
        layer.load(0, {shade: false});
        params = params == undefined ? {} : params;
        //url+=(url.indexOf('&')>-1?"&jsoncallback=?"+:"?jsoncallback=?");
        $.ajax({
            type: 'post',
            url: url,
            data: params,
            dateType: 'json',
            //dataType: "jsonp",
            success: function (data) {
                if (callback && typeof callback == "function") {
                    callback(data);
                }
                layer.closeAll('loading');
            },
            error: function (e) {
                console.log(e.responseText);
                layer.msg("喔呦，程序好像出错了", {time: 12000, icon: 5});
                layer.closeAll('loading');
            }
        })
    }
    //属性拷贝
    util.extends = function (_old, _new) {
        for (var key in _old) {
            if (!Object.hasOwnProperty(key)) continue;
            _old[key] = _new[key];
        }
        return _old;
    }



    return util;
});
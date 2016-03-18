/*rquire 配置*/
var host = location.host;
//配置
require.config({
    baseUrl: host,
    paths: {
        "jquery": "/lib/jquery.min",
        "text": "/lib/text",
        "layer": "/weight/layer/layer",
        "lay": "/weight/layer/lay",
        "pagination": "/weight/pagination/jquery.pagination",
        "page": "/weight/pagination/page",
        "util": "/bg/js/util",
        "business": "/bg/js/business",
    },
    shim: {
        //分页插件
        'pagination': {
            deps: ['jquery'],
            exports: 'jQuery.fn.pagination'
        },
        // 弹框插件
        'layer': {
            deps: ['jquery'],
            exports: 'jQuery.fn.layer'
        },

    }
});


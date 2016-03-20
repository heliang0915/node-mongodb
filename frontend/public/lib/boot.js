/*rquire 配置*/
var host = location.host;
//配置
require.config({
    baseUrl: host,
    paths: {
        //第三方
        "jquery": "/lib/jquery.min",
        "text": "/lib/text",
        "moment":"/lib/moment",
        "layer": "/weight/layer/layer",
        "pagination": "/weight/pagination/jquery.pagination",
        "laydate": "/weight/datepicker/laydate",

        //业务js
        "lay": "/weight/layer/lay",
        "page": "/weight/pagination/page",
        "datepicker":"/weight/datepicker/datepicker",
        "util": "/bg/js/util",
        "form":"/bg/js/form",
        "business": "/bg/js/business"
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
        // 日期插件
        'laydate': {
            exports: 'laydate'
        },
        'moment': {
            exports: 'moment'
        }
    }
});


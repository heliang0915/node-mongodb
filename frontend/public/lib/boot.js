/*rquire 配置*/
var host = location.host;
//配置
require.config({
    baseUrl: host,
    paths: {
        //第三方
        "jquery": "/lib/jquery.min",
        "text": "/lib/text",
        "moment": "/lib/moment",
        "layer": "/weight/layer/layer",
        "pagination": "/weight/pagination/jquery.pagination",
        "laydate": "/weight/datepicker/laydate",
        "ztree": "/weight/tree/jquery.ztree.all.min",

        //组件js
        "lay": "/weight/layer/lay",
        "page": "/weight/pagination/page",
        "datepicker": "/weight/datepicker/datepicker",
        "upload": "/weight/upload/upload",
        "tree": "/weight/tree/tree",
        "util": "/bg/js/util",


        //业务js
        "form": "/bg/js/form",
        "business": "/bg/js/business",
        "common":"/common/js/common"
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
        },
        'ztree': {
            deps: ['jquery'],
            exports: 'ztree'
        }
    }
});


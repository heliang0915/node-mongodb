"use strict";
exports.debug = true;
exports.port = 3000;
exports.email = 'flyoung2008@gmail.com';
exports.site_name = 'Node TODO';
exports.site_desc = 'Very simple todo, demo for connect web dev.';
exports.session_secret = 'todo session secret';

exports.host="127.0.0.1";

//上传文件存放位置
exports.uploadDir='../backend/uploaddir/';

//数据库链接地址
exports.url = 'mongodb://127.0.0.1:27017/node';
//exports.url = 'mongodb://192.168.169.41:27017/node';

exports.pageSize=10;
exports.staticHTMLPath="../frontend/fg/static_html/";

/*配置路由跳转页面和显示字段*/
//主页
exports.home={
    index:"bg/home",
    modify:"",
    pageIndex:0
}

//商品
exports.product={
     index:"bg/product/product",
     modify:"",
    pageIndex:1
}
//订单
exports.order={
    index:"bg/order/order",
    modify:"",
    pageIndex:2
}
//会员
exports.member={
    module:"member",//schema模块名称
    index:"bg/member/member",
    list:'bg/member/memberlist',
    modifyPage:'bg/member/modifymember',
    pageIndex:3
}
//会员等级
exports.memberRank={
    module:"memberRank", //schema模块名称
    index:"bg/member/memberrank",
    list:'bg/member/memberranklist',
    modifyPage:'bg/member/modifymemberrank',
    pageIndex:3
}



//设置
exports.setting={
    index:"bg/setting/setting",
    modify:"",
    pageIndex:4
}
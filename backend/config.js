"use strict";
exports.debug = true;
exports.port = 3000;
exports.email = 'flyoung2008@gmail.com';
exports.site_name = 'Node TODO';
exports.site_desc = 'Very simple todo, demo for connect web dev.';
exports.session_secret = 'todo session secret';

//上传文件存放位置
exports.uploadDir='../backend/uploaddir/';

//数据库链接地址
exports.url = 'mongodb://192.168.1.106:27017/node';
//exports.url = 'mongodb://192.168.169.41:27017/node';

exports.pageSize=10;



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
    index:"bg/member/member",
    list:'bg/member/memberlist',
    modify:"",
    pageIndex:3
    //,
    //showFileds:{"userName":"","tel":"","rank":"","email":"","sex":""} //页面显示的字段
}
//设置
exports.setting={
    index:"bg/setting/setting",
    modify:"",
    pageIndex:4
}
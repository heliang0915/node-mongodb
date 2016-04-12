"use strict";
/*配置文件*/
exports.debug = true;
exports.port = 3000;
exports.email = 'flyoung2008@gmail.com';
exports.site_name = 'Node TODO';
exports.site_desc = 'Very simple todo, demo for connect web dev.';
exports.session_secret = 'todo session secret';

//app 地址
exports.host = "192.168.1.103";
//redis 连接地址
exports.redis_host = "192.168.1.119";
//数据库链接地址
exports.url = 'mongodb://192.168.1.119:27017/node';

//上传文件存放位置
exports.uploadDir = '../backend/uploaddir/';

exports.pageSize = 10;
exports.staticHTMLPath = "../frontend/fg/static_html/";

/*配置路由跳转页面和显示字段*/
//主页
exports.home = {
    index: "bg/home",
    title:"主页",
    modify: "",
    pageIndex: 0
}

//商品
exports.product = {
    module: "product",//schema模块名称
    title:"商品",
    index: "bg/product/product",
    list: 'bg/product/productlist',
    modify: "",
    pageIndex: 1
}
//商品标签
exports.productTag = {
    module: "productTag",//schema模块名称
    title:"商品标签",
    //index: "bg/product/producttag",
    list: 'bg/product/producttaglist',
    modifyPage: 'bg/product/modifyproducttag',
    pageIndex: 1
}

//商品分类
exports.productCategory = {
    module: "productCategory",//schema模块名称
    title:"商品分类",
    //index: "bg/product/productcategory",
    list: 'bg/product/productcategorylist',
    modifyPage: 'bg/product/modifyproductcategory',
    pageIndex: 1
}
//商品品牌
exports.productBrand = {
    module: "productBrand",//schema模块名称
    title:"商品品牌",
    //index: "bg/product/productbrand",
    list: 'bg/product/productbrandlist',
    modifyPage: 'bg/product/modifyproductbrand',
    pageIndex: 1
}

//商品类型
exports.productType = {
    module: "productType",//schema模块名称
    title:"商品类型",
    //index: "bg/product/producttype",
    list: 'bg/product/producttypelist',
    modifyPage: 'bg/product/modifyproducttype',
    relationspec:'bg/product/relationspec',
    pageIndex: 1
}

//商品规格
exports.productSpecifications = {
    module: "productSpecifications",//schema模块名称
    title:"商品规格",
    list: 'bg/product/productspecificationslist',
    modifyPage: 'bg/product/modifyproductspecifications',
    pageIndex: 1
}

//商品参数
exports.productParams = {
    module: "productParams",//schema模块名称
    title:"商品参数",
    list: 'bg/product/productparamslist',
    modifyPage: 'bg/product/modifyproductparams',
    pageIndex: 1
}



//订单
exports.order = {
    index: "bg/order/order",
    title:"订单",
    modify: "",
    pageIndex: 2
}
//会员
exports.member = {
    module: "member",//schema模块名称
    title:"会员",
    index: "bg/member/member",
    list: 'bg/member/memberlist',
    modifyPage: 'bg/member/modifymember',
    pageIndex: 3
}
//会员等级
exports.memberRank = {
    module: "memberRank", //schema模块名称
    title:"会员等级",
    index: "bg/member/memberrank",
    list: 'bg/member/memberranklist',
    modifyPage: 'bg/member/modifymemberrank',
    pageIndex: 3
}

//设置
exports.setting = {
    index: "bg/setting/setting",
    title:"设置",
    modify: "",
    pageIndex: 4
}
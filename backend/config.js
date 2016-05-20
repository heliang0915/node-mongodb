"use strict";
/*配置文件*/
exports.debug = true;
exports.port = 3000;
exports.email = 'flyoung2008@gmail.com';
exports.site_name = 'Node TODO';
exports.site_desc = 'Very simple todo, demo for connect web dev.';
exports.session_secret = 'todo session secret';

//app 地址
exports.host = "localhost";
//redis 连接地址
exports.redis_host = "192.168.0.117";
//数据库链接地址
exports.url = 'mongodb://192.168.0.117:27017/node';

//上传文件存放位置
exports.uploadDir = '../backend/uploaddir/';

exports.pageSize = 10;
//前端静态文件存放目录
exports.staticHTMLPath = "../frontend/fg/static_html/";

exports.resourceURl = '127.0.0.1/resource';

/*配置路由跳转页面和显示字段*/


/**************前端配置**************/
//主页
exports.home = {
    index: "fg/index",
    title: "主页",
    modify: "",
    pageIndex: 0
}


/**************前端配置**************/

/**************后端配置**************/
//主页
exports.bghome = {
    index: "bg/home",
    title: "主页",
    modify: "",
    pageIndex: 0
}

//商品
exports.product = {
    module: "product",//schema模块名称
    action: "manager/product",//action名称
    title: "商品",
    index: "bg/product/product",
    list: 'bg/product/productlist',
    modify: "",
    pageIndex: 1
}
//商品标签
exports.productTag = {
    module: "productTag",//schema模块名称
    action: "manager/productTag",//action名称
    title: "商品标签",
    //index: "bg/product/producttag",
    list: 'bg/product/producttaglist',
    modifyPage: 'bg/product/modifyproducttag',
    pageIndex: 1
}

//商品分类
exports.productCategory = {
    module: "productCategory",//schema模块名称
    action: "manager/productCategory",//action名称
    title: "商品分类",
    //index: "bg/product/productcategory",
    list: 'bg/product/productcategorylist',
    modifyPage: 'bg/product/modifyproductcategory',
    pageIndex: 1
}
//商品品牌
exports.productBrand = {
    module: "productBrand",//schema模块名称
    action: "manager/productBrand",//action名称
    title: "商品品牌",
    //index: "bg/product/productbrand",
    list: 'bg/product/productbrandlist',
    modifyPage: 'bg/product/modifyproductbrand',
    pageIndex: 1
}

//商品类型
exports.productType = {
    module: "productType",//schema模块名称
    action: "manager/productType",//action名称
    title: "商品类型",
    //index: "bg/product/producttype",
    list: 'bg/product/producttypelist',
    modifyPage: 'bg/product/modifyproducttype',
    relationspec: 'bg/product/relationspec',
    pageIndex: 1
}

//商品规格
exports.productSpecifications = {
    module: "productSpecifications",//schema模块名称
    action: "manager/productSpecifications",//action名称
    title: "商品规格",
    list: 'bg/product/productspecificationslist',
    modifyPage: 'bg/product/modifyproductspecifications',
    pageIndex: 1
}

//商品参数
exports.productParams = {
    module: "productParams",//schema模块名称
    action: "manager/productParams",//action名称
    title: "商品参数",
    list: 'bg/product/productparamslist',
    modifyPage: 'bg/product/modifyproductparams',
    pageIndex: 1
}
//商品属性
exports.productAttr= {
    module: "productAttr",//schema模块名称
    action: "manager/productattrs",//action名称
    title: "商品属性",
    list: 'bg/product/productattrslist',
    modifyPage: 'bg/product/modifyproductattrs',
    pageIndex: 1
}

//订单
exports.order = {
    index: "bg/order/order",
    title: "订单",
    modify: "",
    pageIndex: 2
}
//会员
exports.member = {
    module: "member",//schema模块名称
    action: "manager/member",//action名称
    title: "会员",
    index: "bg/member/member",
    list: 'bg/member/memberlist',
    modifyPage: 'bg/member/modifymember',
    pageIndex: 3
}
//会员等级
exports.memberRank = {
    module: "memberRank", //schema模块名称
    action: "manager/memberRank",//action名称
    title: "会员等级",
    index: "bg/member/memberrank",
    list: 'bg/member/memberranklist',
    modifyPage: 'bg/member/modifymemberrank',
    pageIndex: 3
}

//设置
exports.setting = {
    index: "bg/setting/setting",
    title: "设置",
    modify: "",
    pageIndex: 4
}


/**************后端配置**************/
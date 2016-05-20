/**
 * 路由中心控制器
 */
var express = require('express');
var router = express.Router();
var util=require("../util/util");
var config=require("../config");

/********************前端分发器*******************/
//主页
var home=require('./fg/home');



/********************前端分发器*******************/



/********************后端分发器*******************/
//主页
var bghome=require('./bg/home');

/*商品模块*/
//商品
var product=require('./bg/product/product');
var productTag=require('./bg/product/productTag');
var productCategory=require('./bg/product/productCategory');
var productBrand=require('./bg/product/productBrand');
var productType=require('./bg/product/productType');
var productSpecifications=require('./bg/product/productSpecifications');
var productParams=require('./bg/product/productParams');
var productAttr=require('./bg/product/productAttr');

////商品分类
//var productItem=require('./productItem');
////商品标签
//var procuctTag=require('./productTag');

/*订单模块*/
//订单
var order=require('./bg/order/order');

/*会员模块*/
//会员
var member=require('./bg/member/member');
////会员等级
var memberrank=require('./bg/member/memberrank');


/*设置模块*/
var setting=require('./bg/setting/setting');


////菜单
//var menu=require('./menu');
////权限点
//var permission=require('./permission');
////角色
//var role=require('./role');



router.use('/',home);
router.use('/manager/',bghome);


/*路由分类设置*/
router.use('/manager/product',product);
router.use('/manager/producttag',productTag);
router.use('/manager/productcategory',productCategory);
router.use('/manager/productbrand',productBrand);
router.use('/manager/producttype',productType);
router.use('/manager/productspecifications',productSpecifications);
router.use('/manager/productparams',productParams);
router.use('/manager/productattrs',productAttr);

//router.use('/productItem',productItem);
//router.use('/procuctTag',procuctTag);
router.use('/manager/order',order);
router.use('/manager/member',member);
router.use('/manager/memberrank',memberrank);
router.use('/manager/setting',setting);

//router.use('/menu',menu);
//router.use('/permission',permission);
//router.use('/role',role);



/********************后端分发器*******************/
module.exports = router;

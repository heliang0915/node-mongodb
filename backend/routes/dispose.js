/**
 * 路由中心控制器
 */
var express = require('express');
var router = express.Router();
var util=require("../util/util");

//主页
var home=require('./home');

/*商品模块*/
//商品
var product=require('./product/product');
var productTag=require('./product/productTag');
var productCategory=require('./product/productCategory');
var productBrand=require('./product/productBrand');
var productType=require('./product/productType');
var productSpecifications=require('./product/productSpecifications');
var productParams=require('./product/productParams');


////商品分类
//var productItem=require('./productItem');
////商品标签
//var procuctTag=require('./productTag');

/*订单模块*/
//订单
var order=require('./order/order');

/*会员模块*/
//会员
var member=require('./member/member');
////会员等级
var memberrank=require('./member/memberrank');


/*设置模块*/
var setting=require('./setting/setting');

var config=require("../config");
////菜单
//var menu=require('./menu');
////权限点
//var permission=require('./permission');
////角色
//var role=require('./role');




router.use('/',home);


/*路由分类设置*/
router.use('/product',product);
router.use('/producttag',productTag);
router.use('/productcategory',productCategory);
router.use('/productbrand',productBrand);
router.use('/producttype',productType);
router.use('/productspecifications',productSpecifications);
router.use('/productparams',productParams);

//router.use('/productItem',productItem);
//router.use('/procuctTag',procuctTag);
router.use('/order',order);
router.use('/member',member);
router.use('/memberrank',memberrank);
router.use('/setting',setting);

//router.use('/menu',menu);
//router.use('/permission',permission);
//router.use('/role',role);




module.exports = router;

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
var product=require('./product');
////商品分类
//var productItem=require('./productItem');
////商品标签
//var procuctTag=require('./productTag');

/*订单模块*/
//订单
var order=require('./order');

/*会员模块*/
//会员
var member=require('./member');
////会员等级
//var memberRank=require('./memberRank');

/*设置模块*/
var setting=require('./setting');

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
//router.use('/productItem',productItem);
//router.use('/procuctTag',procuctTag);
router.use('/order',order);
router.use('/member',member);
router.use('/setting',setting);

//router.use('/menu',menu);
//router.use('/permission',permission);
//router.use('/role',role);




module.exports = router;

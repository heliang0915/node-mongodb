/*
* 主页 路由
* */
var express = require('express');
var router = express.Router();
var util=require("../util/util");
var config=require("../config");
var logger=require('../../log4j/logger');
var accessLogger = logger.accessLogger;
//首页
router.route('/').all(function (req, res) {
    var params = util.getParams(req);
    console.log("首页");
    res.render(config.home.index, {title: '测试商品首页',pageIndex:config.home.pageIndex, content: '测试商品首页内容'});
})

module.exports = router;
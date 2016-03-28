/**
 *订单 路由
 */
var express = require('express');
var router = express.Router();
var util=require("../../util/util");
var config=require("../../config");


//访问订单首页
router.route('/').all(function (req, res) {
    var params = util.getParams(req);
    console.log(params);
    res.render(config.order.index, {title: '测试商品首页',pageIndex:config.order.pageIndex,active:'active', content: '测试商品首页内容'});
})

module.exports = router;

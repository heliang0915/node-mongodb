/**
 * 商品 路由
 */
var express = require('express');
var router = express.Router();
var util=require("../util/util");
var config=require("../config");
//访问商品首页
router.route('/').all(function(req, res){
    var params=util.getParams(req);
    console.log(params);
    res.render(config.product.index, {title: '测试商品首页',pageIndex:config.product.pageIndex,active:'active', content: '测试商品首页内容'});

})
//访问列表
router.route('/list').all(function (req, res) {
    res.render(config.product.index, {title: '测试商品首页', content: '测试商品首页内容'});
});

module.exports = router;

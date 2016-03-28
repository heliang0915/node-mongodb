/**
 * 商品 路由
 */
var express = require('express');
var router = express.Router();
var util=require("../../util/util");
var config=require("../../config");
//访问商品首页
router.route('/').all(function(req, res){
    var params=util.getParams(req);
    console.log(params);
    res.render(config.product.index, {title:config.product.title,action:config.product.module.toLocaleLowerCase(), pageIndex:config.product.pageIndex,active:'active'});

})
//访问列表
router.route('/list').all(function (req, res) {
    res.render(config.product.list, {title: '商品标签', content: '商品标签内容'});

});

module.exports = router;

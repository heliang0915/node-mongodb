/**
 * 角色 路由
 */
var express = require('express');
var router = express.Router();
var util=require("../../util/util");
var config=require("../../config");

//访问角色首页
router.route('/').all(function (req, res) {
    var params = util.getParams(req);
    console.log(params);
    res.render('bg/test-index', {title: '测试商品首页',active:'active', content: '测试商品首页内容'});
})

module.exports = router;

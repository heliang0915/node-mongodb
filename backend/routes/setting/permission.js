/**
 *权限点 路由
 */
var express = require('express');
var router = express.Router();
var util=require("../../util/util");


//访问权限点首页
router.route('/').all(function (req, res) {
    var params = util.getParams(req);
    console.log(params);
    res.render('bg/test-index', {title: '测试商品首页', content: '测试商品首页内容'});
})

module.exports = router;
/**
 * 系统设置 路由
 */
var express = require('express');
var router = express.Router();
var util=require("../util/util");
var config=require("../config");

//访问系统设置首页
router.route('/').all(function (req, res) {
    var params = util.getParams(req);
    console.log(params);
    res.render(config.setting.index, {title: '测试商品首页',pageIndex:config.setting.pageIndex,active:'active', content: '测试商品首页内容'});
})

module.exports = router;
/**
 * 会员等级 路由
 */
var express = require('express');
var router = express.Router();
var util = require("../util/util");
var message = require("../util/message");
var config = require("../config");
var memberRankDao = require('../dao/memberRankDao');

//访问会员等级首页
router.route('/').all(function (req, res) {
    var params = util.getParams(req,memberRankDao,config.memberRank.module);
    res.render(config.memberRank.index, {title: '会员首页', pageIndex: config.member.pageIndex, content: '会员内容'});
})

//进入会员列表页面
router.route('/list').all(function (req, res) {
    console.log("list......");
    var params = util.getParams(req,memberRankDao,config.memberRank.module);
    var searchText = "";
    var ary = [];
    var searchData = util.getSearchData(params);
    memberRankDao.count(searchData, function (err, totalCount) {
        if (err) {
            util.showErr(res, err);
        } else {
            console.log(JSON.stringify(params));
            res.render(config.memberRank.list, {
                title: '会员等级list',
                data: JSON.stringify(params),
                searchText: searchText,
                pageSize: config.pageSize,
                totalCount: totalCount
            });
        }
    });
});


//ajax分页d
router.route('/page').all(function (req, res) {
    var params = util.getParams(req,memberDao,config.member.module);
    console.log(".......page");
    var currentPage = params.currentPage;
    var searchData = util.getSearchData(params);
    memberDao.page(currentPage, searchData, function (err, members) {
        var json = {};
        json.data = members;
        res.send(json);
    });
});


module.exports = router;
/**
 * 会员等级 路由
 */
var express = require('express');
var router = express.Router();
var util = require("../../../util/util");
var message = require("../../../util/message");
var config = require("../../../config");
var memberRankDao = require('../../../dao/member/memberRankDao');

//访问会员等级首页
router.route('/').all(function (req, res) {
    var params = util.getParams(req,memberRankDao,config.memberRank.module);
    //res.render(config.memberRank.index, {title: '会员首页', pageIndex: config.member.pageIndex, content: '会员内容'});
    res.render(config.member.index, {title:config.memberRank.title,action:config.memberRank.action.toLocaleLowerCase(), pageIndex:config.member.pageIndex,active:'active'});
})

//进入会员列表页面
router.route('/list').all(function (req, res) {
    console.log("会员等级list......");
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


//ajax分页
router.route('/page').all(function (req, res) {
    var params = util.getParams(req,memberRankDao,config.memberRank.module);
    console.log(".......page");
    var currentPage = params.currentPage;
    var searchData = util.getSearchData(params);
    memberRankDao.page(currentPage, searchData, function (err, memberRanks) {
        var json = {};
        json.data = memberRanks;
        res.send(json);
    });
});


//跳转新增页面
router.route('/modify').all(function (req, res) {
    var params = util.getParams(req,memberRankDao,config.memberRank.module);
    var uuid = params.uuid;
    if (uuid) {
        memberRankDao.findByUUID(uuid, function (err, memberRank) {
            if (err) {
                util.showErr(res, err);
            } else {
                res.render(config.memberRank.modifyPage, {
                    memberRank: memberRank
                });
            }
        });
    } else {
        res.render(config.memberRank.modifyPage, {
            memberRank: {}
        });
    }
});
//保存数据
router.route('/save').all(function (req, res) {
    var modelData = util.getParams(req,memberRankDao,config.memberRank.module);
    var str = "";
    var state = "ok";
    var json = {};
    if (modelData.uuid) {
        memberRankDao.edit(modelData.uuid, modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "会员等级修改成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    } else {
        memberRankDao.add(modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "会员等级添加成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    }
});
//删除数据
router.route('/del').all(function (req, res) {
    var modelData = util.getParams(req,memberRankDao,config.memberRank.module);
    var str = "";
    var state = "ok";
    var json = {};
    var uuids = modelData.uuid;
    memberRankDao.del(uuids, function (err) {
        if (err) {
            str = err;
            state = "err";
        } else {
            str = "会员等级删除成功！";
        }
        json = message.parseJSON(state, str);
        res.send(json);
    });
});


module.exports = router;
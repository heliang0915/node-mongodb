/**
 * 会员路由
 */
var express = require('express');
var router = express.Router();
var util = require("../../../util/util");
var message = require("../../../util/message");
var config = require("../../../config");
var memberDao = require('../../../dao/member/memberDao');
var memberRankDao = require('../../../dao/member/memberRankDao');


//访问会员首页
router.route('/').all(function (req, res) {
    console.log(">>>访问会员首页>>>");
    var params = util.getParams(req, memberDao, config.member.module);
    //util.createStaticHTML("1","","你好静态资源");
    res.render(config.member.index, {title:config.member.title,action:config.member.action.toLocaleLowerCase(), pageIndex:config.member.pageIndex,active:'active'});
})

//进入会员列表页面
router.route('/list').all(function (req, res) {
    console.log("member-list......");
    var params = util.getParams(req, memberDao, config.member.module);
    var searchText = "";
    var ary = [];
    var searchData = util.getSearchData(params);
    memberDao.count(searchData, function (err, totalCount) {
        if (err) {
            util.showErr(res, err);
        } else {
            res.render(config.member.list, {
                title: '会员list',
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
    var params = util.getParams(req, memberDao, config.member.module);
    console.log(".......page");
    var currentPage = params.currentPage;
    var searchData = util.getSearchData(params);
    memberDao.page(currentPage, searchData, function (err, members) {
        var len=members.length;
        //查询用户等级
        memberRankDao.setModelName(config[config.memberRank.module]["module"]);
        var memberList=[];
        members.forEach(function(member,i){
            memberRankDao.findByUUID(member.rank,function (err, memberRank) {
                member._doc.rankName=memberRank.name;
                memberList.push(member);
                if(i==len-1){ //到达最后一个元素
                    var json = {};
                    json.data = memberList;
                    res.send(json);
                }

            });
        });
    });
});

//跳转新增页面
router.route('/modify').all(function (req, res) {
    var params = util.getParams(req, memberDao, config.member.module);
    var uuid = params.uuid;
    //查询用户等级
    memberRankDao.setModelName(config[config.memberRank.module]["module"]);
    memberRankDao.findAll(function (err, memberRanks) {
        if (err) {
            util.showErr(res, err);
        } else {
            if (uuid) {
                memberDao.setModelName(config[config.member.module]["module"]);
                memberDao.findByUUID(uuid, function (err, member) {
                    if (err) {
                        util.showErr(res, err);
                    } else {
                        res.render(config.member.modifyPage, {
                            member: member,
                            memberRanks: memberRanks
                        });
                    }
                });
            } else {
                res.render(config.member.modifyPage, {
                    member: {},
                    memberRanks: memberRanks
                });
            }
        }
    });


});
//保存数据
router.route('/save').all(function (req, res) {
    var modelData = util.getParams(req, memberDao, config.member.module);
    var str = "";
    var state = "ok";
    var json = {};
    if (modelData.uuid) {
        memberDao.edit(modelData.uuid, modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "会员修改成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    } else {
        modelData.password = util.md5(modelData.password);
        memberDao.add(modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "会员添加成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    }
});
//删除数据
router.route('/del').all(function (req, res) {
    var modelData = util.getParams(req, memberDao, config.member.module);
    var str = "";
    var state = "ok";
    var json = {};
    var uuids = modelData.uuid;
    memberDao.del(uuids, function (err) {
        if (err) {
            str = err;
            state = "err";
        } else {
            str = "会员删除成功！";
        }
        json = message.parseJSON(state, str);
        res.send(json);
    });
});


module.exports = router;
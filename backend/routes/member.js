/**
 * 会员路由
 */
var express = require('express');
var router = express.Router();
var util=require("../util/util");
var config=require("../config");
var memberDao = require('../dao/memberDao');

//访问会员首页
router.route('/').all(function(req, res){
    console.log("测试商品首页");
    util.createStaticHTML("1","","你好静态资源5");
   res.render("fg/static_html/1",{title:'测试商品首页',pageIndex:config.member.pageIndex,content:'测试商品首页内容'});
})

//进入会员列表页面
router.route('/list').all(function(req,res){
    memberDao.count({},function(err,totalCount){
        console.log(err);
        console.log(totalCount);
        if(err){
            res.send(err);
        }else{
            res.render(config.member.list,{title: '会员list',pageSize:config.pageSize,totalCount:totalCount});
        }
    });
});

//ajax分页
router.route('/page').all(function(req,res){
    var params=util.getParams(req);
    console.log(params);
    var currentPage=params.currentPage;
    var data={};
    if(params.data){
        data=params.data;
    }
    memberDao.page(currentPage,data,function (err, members) {
        res.send(members);
    });
});


//新增数据
router.route('/add').all(function (req, res) {
    var modelData =util.getParams(req);
    //var index=11;
    //modelData.userName="测试用户"+index;
    //modelData.name="李四";
    //modelData.sex=0;
    //modelData.birthday="1987-09-13";
    //modelData.email="4444@qq.com";
    //modelData.tel="15811316527";
    //modelData.rank="用户等级";
    //modelData.address="地址";
    //modelData.postCode="邮政编码";
    //modelData.question="问题";
    //modelData.answer="测试回答";
    //modelData.password="1234456";
    //modelData.order=index;
    //console.log(modelData);

    modelData.password = util.md5(modelData.password);
    memberDao.add(modelData, function (err) {
        var str = "";
        if (err) {
            str = err;
        } else {
            str = "插入数据成功！";
        }
        res.write(str);
        res.end();
    });
});
//修改数据
router.route('/edit').all(function (req, res) {
    var modelData =util.getParams(req);
    modelData.password = util.md5(modelData.password);

    memberDao.edit(modelData.uuid, modelData, function (err) {
        var str = "";
        if (err) {
            str = err;
        } else {
            str = "数据修改成功！";
        }
        res.write(str);
        res.end();
    });
});
//删除数据
router.route('/del').all(function (req, res) {
    var modelData =util.getParams(req);
    var str = "数据删除成功";
    try {
        memberDao.del(modelData.uuid);
    } catch (e) {
        str = e;
    }
    res.write(str);
    res.end();
});


function showErr(res,err){
    res.send(err);
}

module.exports = router;
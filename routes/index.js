var express = require('express');
var userDao = require('../dao/userDao');
var url = require("url");
var md5util=require("../util/md5");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //查询所有数据
    userDao.findAll(function (err, users) {
        res.render('index', {
            title: '首页',
            users: users
        });
    });

});
//新增数据
router.route('/add').post(function (req, res) {
    var modelData=req.body;
    modelData.password=md5util.md5(modelData.password);
    userDao.add(modelData,function(err){
        var str="";
        if(err){
            str=err;
        }else{
            str="插入数据成功！";
        }
        res.write(str);
        res.end();
    });
});
//修改数据
router.route('/edit').post(function (req, res) {
    var modelData=req.body;
    modelData.password=md5util.md5(modelData.password);
    userDao.edit(modelData.uuid,modelData,function(err){
        var str="";
        if(err){
            str=err;
        }else{
            str="数据修改成功！";
        }
        res.write(str);
        res.end();
    });
});
//删除数据
router.route('/del').post(function (req, res) {
    var modelData=req.body;
    var str="数据删除成功";
    try{
        userDao.del(modelData.uuid);
    }catch(e){
        str= e;
    }
    res.write(str);
    res.end();
});
module.exports = router;

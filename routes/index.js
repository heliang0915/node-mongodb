var express = require('express');
var userDao = require('../dao/userDao');
var url = require("url");
var md5util=require("../util/md5");
var multiparty = require('multiparty');
var fs=require('fs');
var url=require('url');
var qs = require('querystring');

var router = express.Router();
var uploadDir='../uploaddir/';

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
/* 上传*/
router.post('/upload', function(req, res, next){
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir:uploadDir});
    //console.log(form);
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        //console.log("上传..."+err, fields, files);
        var filesTmp = JSON.stringify(files,null,2);
        //console.log(err);
        if(err){
            console.log('parse error: ' + err);
        } else {
            //console.log('parse files: ' + filesTmp);
            var inputFile = files.upFile[0];
            var uploadedPath = inputFile.path;
            var dstPath =uploadDir+ inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                    res.write("<script>parent.uploadSuccess('"+err+"')</script>");
                } else {
                    res.write("<script>parent.uploadSuccess(null,'"+dstPath+"')</script>");
                }
                res.end();
            });
        }
        //res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        //res.write('received upload:\n\n');
        //res.end(util.inspect({fields: fields, files: filesTmp}));
    });
});

router.get('/uploaddir',function(req,res){
        var queryUrl=url.parse(req.url).query;
        console.log(qs.parse(queryUrl)) ;
})

module.exports = router;

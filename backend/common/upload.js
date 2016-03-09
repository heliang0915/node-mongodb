/**
 * 文件上传组件处理  @heliang
 * @type {*|exports|module.exports}
 */
var express = require('express');
var router = express.Router();
var multiparty=require('multiparty');
var fs=require('fs');
//获取配置对象
var config = require('../config');
var util = require("../util/util");
var uploadDir = config.uploadDir;

/* GET users listing. */
router.all('/', function(req, res, next) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: uploadDir});
    //console.log(form);
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error: ' + err);
        } else {
            var inputFile = files.upFile[0];
            console.log(files);
            var uploadedPath = inputFile.path;
            var dstPath = uploadDir + inputFile.originalFilename;

            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                var data = util.getFileData(dstPath);
                if (err) {
                    console.log('rename error: ' + err);
                    res.write("<script>parent.uploadSuccess('" + err + "')</script>");
                } else {
                    res.write("<script>parent.uploadSuccess(null,'" + inputFile.originalFilename + "')</script>");
                }
                res.end();
            });
        }
    });
});


module.exports = router;
/**
 * 文件上传组件处理  @heliang
 * @type {*|exports|module.exports}
 */
var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var url = require("url");
//获取配置对象
var config = require('../config');
var util = require("../util/util");
var uploadDir = config.uploadDir;

/* GET users listing. */
router.all('/', function (req, res, next) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: uploadDir});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        var fileInput;
        for (var key in files) {
            fileInput = key;
        }
        if (err) {
            console.log('parse error: ' + err);
        } else {
            if (files) {
                var inputFile = files[fileInput][0];
                var uploadedPath = inputFile.path;
                var fileName = inputFile.originalFilename;
                var fieldName = inputFile.fieldName;
                console.log("fieldName>>>"+fieldName);
                var dstPath = uploadDir + fileName;

                //重命名为真实文件名
                fs.rename(uploadedPath, dstPath, function (err) {
                    var data = util.getFileData(dstPath);
                    if (err) {
                        console.log('rename error: ' + err);
                        res.write("<script>parent.uploadSuccess('" + err + "')</script>");
                    } else {
                        console.log('uploadSuccess ' + fileName);
                        res.write("<script>parent.uploadSuccess(null,'" + fileName + "','"+fieldName+"')</script>");
                    }
                    res.end();
                });
            } else {
                console.log('没有找到file 文件控件');
                res.write("<script>parent.uploadSuccess('没有找到file 文件控件')</script>");
                res.end();
            }
        }
    });
});
module.exports = router;
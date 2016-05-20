/***
 *下载资源处理
 */
var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var mime = require("mime");
var util = require("../util/util");
var config = require('../config');
var uploadDir = config.uploadDir;

router.get('/:path?/:attachment?/', function (req, res, next) {
    console.log("下载文件");
    var fileName = req.params.path || "";
    //console.log("是否下载附件----------"+req.params.attachment);
    var attachment = req.params.attachment == "true" ? true : false;
    var path = uploadDir + fileName;
    var mimeType = mime.lookup(path);
    console.log(mimeType);
    var fileType = mime.extension(mimeType);
    console.log(fileType);
    fs.readFile(path, function (error, file) {
        if (error) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.write(error + "\n");
            res.end();
        } else {
            //判断一下是否是附件
            //console.log(attachment);
            attachment == false ? null : res.setHeader('Content-disposition', 'attachment; filename=' + encodeURI(fileName));
            res.writeHead(200, {"Content-Type": mimeType});
            res.write(file);
            res.end();
        }
    });
});

module.exports = router;



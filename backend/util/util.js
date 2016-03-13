/**
 * 工具类
 */
var Buffer = require("buffer").Buffer;
var fs = require('fs');
var url=require('url');

exports.md5 = function md5(data) {
    //var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    return crypto.createHash("md5").update(str).digest("hex");
}
exports.getFileData = function (path) {
    var data = fs.readFileSync(path);
    return data;
}
//判断对象是否为空
var isNotNullObj = function (obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return true;
        }
    }
    return false;
}

exports.getParams=function(req){
    var params=isNotNullObj(req.body)==false?url.parse(req.url,true).query:req.body;
    return params;
}
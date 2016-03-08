/**
 * 工具类
 */
var Buffer = require("buffer").Buffer;
var fs=require('fs');
exports.md5 = function md5(data) {
    //var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    return crypto.createHash("md5").update(str).digest("hex");
}
exports.getFileData=function(path){
    var data=fs.readFileSync(path);
    return data;
}
/**
 * 工具类
 */
var Buffer = require("buffer").Buffer;
var fs = require('fs');
var url=require('url');
var config=require("../config");

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

/**
 *产生静态化文件
 */
exports.createStaticHTML=function(id,htmlTel,data){
    var staticHTMLPath=config.staticHTMLPath;
    var path=staticHTMLPath+id+".html";
    //var rs=fs.createReadStream(path);
    fs.exists(path,function(err, stats){

        var ws=fs.createWriteStream(staticHTMLPath+id+".html");
        htmlTel="<html><head><title>静态文件</title></head><body>内容+"+data+"</body></html>";
        ws.write(htmlTel);
        ws.end();
        console.log("产生....");

    })


}

exports.reloadStaticHTML=reloadStaticHTML;

function  reloadStaticHTML(id){
 console.log("重新生成"+id+".html");

}
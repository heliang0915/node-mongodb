/**
 * 工具类
 */
var Buffer = require("buffer").Buffer;
var fs = require('fs');
var url = require('url');
var config = require("../config");


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

exports.getParams = function (req,dao,type) {
    var params = isNotNullObj(req.body) == false ? url.parse(req.url, true).query : req.body;
    if(type){
        console.log("-----"+config[type]["module"]);
        dao.setModelName(config[type]["module"]);
    }

    return params;
}


//生成搜索条件
exports.getSearchData = function (params) {
    var ary = [];
    var searchData = {};
    for (var key in params) {
        var data = {};
        if (key == "currentPage") {
            continue;
        }
        var val = params[key];
        console.log("val-----------" + val);
        data[key] = params[key];
        ary.push(data);
    }
    if (ary.length > 0) {
        searchData.$or = ary;
    }
    ary.forEach(function (item) {
        var obj = {};
        obj["$options"] = "i";
        obj["$regex"] = val;
        for (var key in item) {
            item[key] = obj;
        }
    })
    return searchData;
}


exports.showErr=function(res, err) {
    res.send(err);
}


/**
 *产生静态化文件
 */
exports.createStaticHTML = function (id, htmlTel, data) {
    var staticHTMLPath = config.staticHTMLPath;
    var path = staticHTMLPath + id + ".html";
    fs.exists(path, function (stats) {
        console.log(stats);

        if (!stats) {
            fs.writeFile(path, "", function () {
                var ws = fs.createWriteStream(staticHTMLPath + id + ".html");
                htmlTel = "<html><head><title>静态文件</title></head><body>内容+" + data + "</body></html>";
                ws.write(htmlTel);
                ws.end();
                console.log("产生....");
            });
        } else {
            console.log("2222");
            var ws = fs.createWriteStream(staticHTMLPath + id + ".html");
            htmlTel = "<html><head><title>静态文件</title></head><body>内容+" + data + "</body></html>";
            ws.write(htmlTel);
            ws.end();
            console.log("产生....");

        }
    })
}

exports.reloadStaticHTML = reloadStaticHTML;
// 重新加载静态资源
function reloadStaticHTML(id) {
    console.log("重新生成" + id + ".html");
}
//配置数据库链接
var mongoose = require('mongoose');
var util = require('util');
var uuid = require('node-uuid');
var modelPath = "../model/";
//全局配置对象
var config = require('../config');

//获取users的schema
var modelName;
var ModelSchema;
var model;

exports.setModelName = function (modelNa) {
    modelName = modelNa;
    model = require(modelPath +"schemas");
    ModelSchema = mongoose.model(modelName);

}
/*生成uuid*/
function getUUID() {
    var reg = /\-/g;
    var tempUUID = uuid.v4().replace(reg, function () {
        return "";
    });
    return tempUUID;
}


/*新增*/
exports.add = function (modelData, callback) {
    /*获取uuid*/
    var tempUUID = getUUID();
    var newModelSchema = new ModelSchema();
    //自动插入uuid
    newModelSchema.uuid = tempUUID;
    for (fileName in modelData) {
        newModelSchema[fileName] = modelData[fileName];
    }
    newModelSchema.save(function (err) {
        if (err) {
            callback(err);
            util.log("新增出现错误：" + err);
        } else {
            callback(null);
            util.log("插入成功");
        }
    });
}

/*修改*/
exports.edit = function (uuid, editObj, callback) {
    callback = callback == undefined ? function () {
    } : callback;
    findByUUID(uuid, function (err, user) {
        if (err) {
            callback(err);
            util.log("修改出现错误：" + err);
        } else {
            //循环
            for (var key in editObj) {
                if (editObj[key] != undefined) {
                    user[key] = editObj[key];
                }
            }
            console.log(editObj);
            user.save(function (err) {
                if (err) {
                    callback(err);
                    util.log("修改出现错误：" + err);
                } else {
                    callback(null);
                    util.log("修改成功");
                }
            });
        }
    });
}

/*删除*/
exports.del = function (uuids, callback) {
    callback = callback == undefined ? function () {} : callback;
    console.log("uuids>>>"+uuids)
    var uuidAry=[];
    if(uuids.indexOf(',')>-1){
        uuidAry=uuids.split(",");
    }else{
        uuidAry.push(uuids);
    }
    console.log("uuidAry>>>"+uuidAry);

    uuidAry.forEach(function(uid){
        console.log("uid>>>>"+uid);
        findByUUID(uid, function (err, modelSchema) {
            if (err) {
                callback(err);
                util.log("删除出现错误：" + err);
            } else {
                //删除
                modelSchema.remove();
                callback(null);
                util.log("删除成功");
            }
        })
    })
}

/*查询*/
exports.findAll = function (callback) {
    findByData({},callback);
}


exports.find=function(data,callback){
    callback = callback == undefined ? function () {} : callback;
    model[modelName].find(data, function (err, models) {
        if (err) {
            callback(err)
        } else {
            callback(null, models);
        }
    });
}

//根据条件查询数量
exports.count=function(data,callback){
    count(data,callback);
}

//分页
exports.page=function(currentPage,data,callback,sortFile){
    //查询总数
    count(data,function(err, total) {
        if (err) {
            callback(err)
        } else {
            var pageSize=config.pageSize;
            var start=(currentPage-1)*pageSize;
            console.log("start>>>>"+start);
            var desc={};
            desc["order"]=-1;
            if(sortFile){
                desc=sortFile;
            }
            console.log("--------------------------------------"+sortFile);
            model[modelName].find(data, function (err, models) {
                console.log(models);
                if (err) {
                    callback(err)
                } else {
                    callback(null, models);
                }
            }).sort(desc).skip(start).limit(config.pageSize);
        }
    });
}
exports.count=function(data,callback){
        count(data,callback);
}



//根据条件查询数据
var findByData=function(data,callback){
    callback = callback == undefined ? function () {} : callback;
    //console.log(  model[modelName].find);
    model[modelName].find(data, function (err, models) {
        if (err) {
            callback(err)
        } else {
            callback(null, models);
        }
    });

}


//根据条件查询数量
var count=function(data,callback){
    data=data==undefined?{}:data;
    callback = callback == undefined ? function () {} : callback;
    model[modelName].count(data,function(err,len){
        if (err) {
            callback(err)
        } else {
            callback(null, len);
            console.log("count>>>>"+len);
        }
    })

}

/*根据uuid查询单条数据*/
var findByUUID = exports.findByUUID = function (uuid, callback) {
    callback = callback == undefined ? function () {
    } : callback;
    model[modelName].findOne({'uuid': uuid}, function (err, model) {
        if (!err) {
            callback(null, model);
            util.log("根据uuid查询单条数据成功");
        } else {
            callback(err, null);
            util.log("查询出现错误：" + err);
        }

    });
}
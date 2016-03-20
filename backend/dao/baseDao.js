//配置数据库链接
var mongoose = require('mongoose');
//var util = require('util');
var uuid = require('node-uuid');
var modelPath = "../model/";
//全局配置对象
var config = require('../config');
var log4j = require('../../log4j/logger');
var errLogger = log4j.errLogger;
//var accessLogger = log4j.accessLogger;

//获取users的schema
var modelName;
var ModelSchema={};
var model=require(modelPath + "schemas");

exports.setModelName = function (modelNa) {
    modelName = modelNa;
    //model = require(modelPath + "schemas");
    ModelSchema[modelName] = mongoose.model(modelName);
}
/*生成uuid*/
function getUUID() {
    var reg = /\-/g;
    var tempUUID = uuid.v4().replace(reg, function () {
        return "";
    });
    return tempUUID;
}

//返回最大的max
var getMaxOrder = exports.getMaxOrder = function (callback) {
    callback = callback == undefined ? function () {
    } : callback;
    model[modelName].find({}, function (err, doc) {
        if (err) {
            callback(err);
            errLogger.error(err);
        } else {
            callback(null, doc[0].order);
        }
    }).sort({order: -1});
}

//根据条件查询数量
var count = exports.count = function (data, callback) {
    data = data == undefined ? {} : data;
    callback = callback == undefined ? function () {
    } : callback;
    console.log(modelName);
    model[modelName].count(data, function (err, len) {
        if (err) {
            callback(err);
            errLogger.error(err);
        } else {
            callback(null, len);
        }
    })
}

/*新增*/
exports.add = function (modelData, callback) {
    /*获取uuid*/
    var tempUUID = getUUID();
    var newModelSchema = new  ModelSchema[modelName]();
    getMaxOrder(function (err, order) {
        //console.log(order);
        for (var fileName in modelData) {
            newModelSchema[fileName] = modelData[fileName];
        }
        //自动插入uuid
        newModelSchema.order = parseInt(order) + 1;
        newModelSchema.uuid = tempUUID;
        //console.log("newModelSchema>>"+JSON.stringify(newModelSchema));
        newModelSchema.save(function (err) {
            if (err) {
                callback(err);
                console.log("新增出现错误：" + err);
                errLogger.error(err);
            } else {
                callback(null);
                console.log("插入成功");
            }
        });
    })
}

/*修改*/
exports.edit = function (uuid, editObj, callback) {
    callback = callback == undefined ? function () {
    } : callback;
    findByUUID(uuid, function (err, user) {
        if (err) {
            callback(err);
            console.log("修改出现错误：" + err);
            errLogger.error(err);
        } else {
            //循环
            for (var key in editObj) {
                if (editObj[key] != undefined) {
                    user[key] = editObj[key];
                }
            }
            user.save(function (err) {
                if (err) {
                    callback(err);
                    console.log("修改出现错误：" + err);
                    errLogger.error(err);
                } else {
                    callback(null);
                    console.log("修改成功");
                }
            });
        }
    });
}

/*删除*/
exports.del = function (uuids, callback) {
    callback = callback == undefined ? function () {
    } : callback;
    var uuidAry = [];
    if (uuids.indexOf(',') > -1) {
        uuidAry = uuids.split(",");
    } else {
        uuidAry.push(uuids);
    }
    uuidAry.forEach(function (uid) {
        //console.log("uid>>>>"+uid);
        findByUUID(uid, function (err, modelSchema) {
            if (err) {
                callback(err);
                console.log("删除出现错误：" + err);
                errLogger.error(err);

            } else {
                //删除
                modelSchema.remove();
                callback(null);
                console.log("删除成功");
            }
        })
    })
}

/*查询*/
exports.findAll = function (callback) {
    findByData({}, callback);
}


exports.find = function (data, callback) {
    callback = callback == undefined ? function () {
    } : callback;
    model[modelName].find(data, function (err, models) {
        if (err) {
            callback(err);
            errLogger.error(err);
        } else {
            callback(null, models);
        }
    });
}

//分页
exports.page = function (currentPage, data, callback, sortFile) {
    //查询总数
    count(data, function (err, total) {
        if (err) {
            callback(err);
            errLogger.error(err);
        } else {
            var pageSize = config.pageSize;
            var start = (currentPage - 1) * pageSize;
            //console.log("start>>>>"+start);
            var desc = {};
            desc["order"] = -1;
            if (sortFile) {
                desc = sortFile;
            }
            model[modelName].find(data, function (err, models) {
                if (err) {
                    callback(err);
                    errLogger.error(err);
                } else {
                    callback(null, models);
                }
            }).sort(desc).skip(start).limit(config.pageSize);
        }
    });
}

//根据条件查询数据
var findByData = function (data, callback) {
    callback = callback == undefined ? function () {
    } : callback;
    //console.log(  model[modelName].find);
    model[modelName].find(data, function (err, models) {
        if (err) {
            callback(err);
            errLogger.error(err);
        } else {
            callback(null, models);
        }
    });

}


/*根据uuid查询单条数据*/
var findByUUID = exports.findByUUID = function (uuid, callback) {
    callback = callback == undefined ? function () {
    } : callback;
    model[modelName].findOne({'uuid': uuid}, function (err, model) {
        if (!err) {
            callback(null, model);
            console.log("根据uuid查询单条数据成功");
        } else {
            callback(err, null);
            console.log("查询出现错误：" + err);
            errLogger.error(err);
        }

    });
}
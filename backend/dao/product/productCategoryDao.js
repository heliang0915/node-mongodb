//引入基类
var baseDao = require('./../baseDao');
var log4j = require('../../../log4j/logger');
var errLogger = log4j.errLogger;
exports = module.exports = baseDao;



//根据父级ID查询
exports.getTreeData = function (pid, callback) {
    console.log("-----------"+baseDao.modelName);
    callback = callback == undefined ? function () {} : callback;
    //console.log("model[modelName]"+model[modelName])
    baseDao.model[baseDao.modelName].find({pid: pid}, function (err, docs) {
        if (err) {
            callback(err);
            errLogger.error(err);
        } else {
            callback(null, docs);
        }
    }).sort({order: -1});
}


exports.isParent=function(pid,callback){
    var hasChildren=false;
    callback = callback == undefined ? function () {} : callback;
    baseDao.model[baseDao.modelName].find({pid: pid}, function (err, docs) {
        if (err) {
            callback(err);
            errLogger.error(err);
        } else {
            if(docs&&docs.length>0){
                hasChildren=true
            }
            callback(null, hasChildren);
        }
    }).sort({order: -1});
}



/**
 * 数据Db类
 */
//配置数据库链接
var mongoose = require('mongoose');
var util = require('util');
//全局配置对象
var config = require('../config');
//获取数据库连接对象
exports.connect=function(){
    console.log("数据库连接打开");
    return mongoose.connect(config.url);
};
//关闭数据库连接
exports.unconnect=function(callback){
    callback = callback == undefined ? function () {} : callback;
    mongoose.disconnect(function(err){
        if(err){
            util.log("数据库关闭时出错:"+err);
        }else{
            callback();
            util.log("数据库连接关闭");
        }
    });
}




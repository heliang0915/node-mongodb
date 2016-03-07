// 定义用户模型
var mongoose = require('mongoose');
var mongodb = require('../db/mongodb');
var Schema = mongoose.Schema;
//获取数据库连接对象
var db = mongodb.connect();
/*定义user模型*/
var userScheMa = new Schema({
    uuid: String,
    userName: String,
    password: String
});
//  定义了一个新的模型，但是此模式还未和users集合有关联
exports.users = db.model('users', userScheMa); //  与users集合关联
exports.db = db;
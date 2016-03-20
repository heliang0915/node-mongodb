var mongoose = require('mongoose');
var mongodb = require('../db/mongodb');
var Schema = mongoose.Schema;
//获取数据库连接对象
var db = mongodb.connect();

/*定义会员模型*/
var member = new Schema({
    uuid: String,
    userName: String, //用户名
    password: String, //密码
    name: String, //姓名
    sex: Number, //0女 1男
    birthday: String, // 生日
    email: String,
    tel: String,
    rank: String, //会员等级
    address: String,//地址
    postCode: String, //邮编
    question: String, //安全问题
    answer: String,  //回答
    order:Number
});
/*定义会员等级模型*/
var memberRank = new Schema({
    uuid: String,
    name: String,//等级名称
    score: Number,//等级积分
    percent: Number,// 优惠百分比
    defaultRank: Boolean //默认等级
});
exports.member = db.model('member', member); //  与member集合关联
exports.memberRank = db.model('memberRank', memberRank); //  与memberRank集合关联
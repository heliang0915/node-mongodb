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
    time: {type: String, default: new Date().getTime()},//创建记录时间 默认排序标志
    order: Number//排序
});
/*定义会员等级模型*/
var memberRank = new Schema({
    uuid: String,
    name: String,//等级名称
    score: Number,//等级积分
    percent: Number,// 优惠百分比
    defaultRank: Boolean,//默认等级
    time: {type: String, default: new Date().getTime()},//创建记录时间 默认排序标志
    order: Number//排序
});


/****************商品***********************/

/*商品分类*/
var productCategory=new Schema({
    uuid: String,
    categoryName:String, //分类名称
    categoryPic:String, //分类图片
    isTop:{type:Boolean, default:false}, //是否为顶级分类
    pid:{type: String, default:"-1"},//上级分类 默认上级为根
    productType:String,  //商品类型 uuid
    isShow:{type:Boolean, default:true},//列表中显示
    time: {type: String, default: new Date().getTime()},//创建记录时间 默认排序标志
    order: Number   //排序
});

/*商品品牌*/
var  productBrand=new Schema({
    uuid: String,
    brandName:String, //品牌名称
    url:String, //品牌网址
    logo:String, //品牌LOGO
    detail:String,//详细说明
    time: {type: String, default: new Date().getTime()}, //创建记录时间 默认排序标志
    order: Number  //排序
});

/*商品类型*/
var productType=new Schema({
    uuid: String,
    typeName:String,//类型名称
    attr:String, //关联属性uuid(多个用,隔开)
    params:String, //关联参数uuid(多个用,隔开)
    brand:String,//关联品牌uuid (多个用,隔开)
    specifications:String, //关联规格uuid
    isAttr:{type:Boolean, default:true},//此类型下商品是否拥有属性
    isParams:{type:Boolean, default:true},//此类型下商品是否拥有参数
    isBrand:{type:Boolean, default:true},//此类型是否关联品牌
    isSpecifications:{type:Boolean, default:true},//此类型是否关联规格
    time: {type: String, default: new Date().getTime()}, //创建记录时间 默认排序标志
    order: Number  //排序
});

/*商品规格*/

/*商品标签*/
var productTag = new Schema({
    uuid: String,
    tagName: String,//标签
    time: {type: String, default: new Date().getTime()},//创建记录时间 默认排序标志
    order: Number//排序
});

/*标签商品设置*/


/****************商品***********************/





/*会员*/
exports.member = db.model('member', member); //  与member集合关联
exports.memberRank = db.model('memberRank', memberRank); //  与memberRank集合关联

/*商品*/
exports.productTag = db.model('productTag', productTag); // 商品标签
exports.productType = db.model('productType', productType); //商品类型
exports.productCategory = db.model('productCategory', productCategory); //商品分类
exports.productBrand = db.model('productBrand', productBrand); //商品品牌

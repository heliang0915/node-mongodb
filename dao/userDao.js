/**
 * Created by helia on 2016/3/6.
 */
//引入基类
var baseDao = require('./baseDao');
baseDao.setModelName("users");
exports=module.exports=baseDao;
//继承基类 扩展方法
exports.getMe=function(){
    console.log('me');
}

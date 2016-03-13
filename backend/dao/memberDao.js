
//引入基类
var baseDao = require('./baseDao');
baseDao.setModelName("member");
exports=module.exports=baseDao;

////继承基类 扩展方法
//exports.getMe=function(){
//    console.log('me');
//}

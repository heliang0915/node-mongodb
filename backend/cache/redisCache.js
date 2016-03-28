/*缓存管理层*/
var redis = require("redis");
var config = require("../config");
var redisClient = redis.createClient(6379, config.redis_host, {});
//定义一个和redis中key相对应对象
var keys = {};
var RedisCache = {
    loadALL: function () {
        //redisClient.set("name", "张三", function () {
        //    console.log("数据插入成功");
        //})
        redisClient.get("name", function (err, data) {
            console.log(data);
        });
    }
}

var counter = 0;
redisClient.on("error", function (err) {
    if (counter == 0) {
        console.log("redis连接断开...");
    }
})
redisClient.on("reconnecting", function () {
    counter++;
    if (counter < 20) {
        console.log("正在进行重连....第" + counter + "次");
    } else {
        console.log("app程序退出");
        process.exit(0);
    }
})
redisClient.on("connect", function () {
    counter = 0;
    console.log("redis连接成功....");
})
//加载全部缓存
exports.reload = function () {
    //加载缓存
    console.log("加载全部缓存...");
    //向redis缓存中添加
    RedisCache.loadALL();
}
exports.RedisCache = RedisCache;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var redisStore = require('connect-redis')(session);

var dispose = require('./backend/routes/dispose');
var upload = require('./backend/common/upload');
var download = require('./backend/common/download');
var config = require('./backend/config');
var filter = require("./filter/filter");

//前端目录
var frontendPath = __dirname + "/frontend";
var app = express();
// view engine setup
app.set('views', path.join(frontendPath, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(frontendPath, 'public')));
app.use(express.static(path.join(frontendPath, 'views/common')));

//添加静态资源路径

//app.use(function(req,res,next){
//     //res.locals.resourceURl=config.resourceURl;
//    //res.render();
//    next();
//})

////使用session中间件
//app.use(session({
//  secret: Math.random() + "", //
//  cookie: {maxAge: 30 * 60 * 1000}, //设置过期时间
//  resave: true, //即使 session 没有被修改，也保存 session 值，默认为 true。
//  saveUninitialized: true  //保存新创建但未修改的session
//}));

//使用session中间件 使用redis为作为存储
app.use(session({
    secret: "keyboard cat",
    //cookie: {maxAge: 30 * 60 * 1000}, //设置过期时间
    resave: true, //即使 session 没有被修改，也保存 session 值，默认为 true。
    saveUninitialized: true, //保存新创建但未修改的session
    store: new redisStore({  //使用redis作为session的存储
        host: config.redis_host,
        port: 6379,
        ttl: 60*20 //过期时间 单位秒
    })
}));


//// 设置 Cookie
//app.use(express.cookieParser('keyboard cat'));

// 设置 Session
//app.use(express.session({
//    store: new RedisStore({
//        host: config.redis_host,
//        port: 6379,
//        ttl: 1800 // 过期时间
//    }),
//    secret: 'keyboard cat',
//    resave: false
//}));


/*
 参数
 * client 你可以复用现有的redis客户端对象， 由 redis.createClient() 创建
 host   Redis服务器名
 port   Redis服务器端口
 socket Redis服务器的unix_socket

 *可选参数

 ttl        Redis session TTL 过期时间 （秒）
 disableTTL 禁用设置的 TTL
 db         使用第几个数据库
 pass       Redis数据库的密码
 prefix     数据表前辍即schema, 默认为 "sess:"
 * */


//}))
//;
//添加过滤器
app.use(filter.loginFilter);
app.use("/", dispose);
//上传处理
app.use('/upload', upload);
//下载处理
app.use('/download', download);
//日志
require('./log4j/logger').use(app);
var log4j = require('./log4j/logger');
// var errLogger = log4j.errLogger;
// var accessLogger = log4j.accessLogger;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('404', {
        message: err.message,
        error: err
    });
    //next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;

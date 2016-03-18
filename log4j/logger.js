/*
* 日志模块
* */
var log4js = require('log4js');
log4js.configure({
    appenders: [
        {  //控制台输出
            type: 'console',
            category: "console"

        },
        {   //错误日志
            type: "dateFile",
            filename: '../logs/err.log',
            pattern: "_yyyy-MM-dd",
            maxLogSize: 1024,
            backups: 3,
            category: 'err'

        },
        {  //普通日志
            type: "dateFile",
            filename: '../logs/access.log',
            pattern: "_yyyy-MM-dd",
            maxLogSize: 1024,
            backups: 3,
            category: 'access'

        }

    ],
    replaceConsole: true,   //替换console.log
    levels:{
        err: 'ERROR',
        access: 'INFO',
        console: 'debug'
    }
});

var errLogger = log4js.getLogger('err');
var accessLogger = log4js.getLogger('access');
var consoleLog = log4js.getLogger('console');

exports.errLogger = errLogger;
exports.accessLogger = accessLogger;

exports.use = function(app) {
    app.use(log4js.connectLogger(errLogger, {level: 'auto',format:':method :url'}));
    app.use(log4js.connectLogger(accessLogger, {level: 'auto',format:':method :url'}));
    app.use(log4js.connectLogger(consoleLog, {level: 'auto',format:':method :url'}));
}



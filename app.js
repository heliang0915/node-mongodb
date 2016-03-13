var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');


//var routes = require('./backend/routes/index');
//var users = require('./backend/routes/users');
var dispose = require('./backend/routes/dispose');

var upload = require('./backend/common/upload');
var download = require('./backend/common/download');



//前端目录
var frontendPath=__dirname+"\\frontend";

var app = express();
// view engine setup
app.set('views',path.join(frontendPath, 'views'));
//app.set('view engine', 'ejs');
app.engine('html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(frontendPath,'public')));
app.use(express.static(path.join(frontendPath,'views/common')));
//app.use('/', routes);
//app.use('/users', users);

app.use("/",dispose);
//上传处理
app.use('/upload',upload);
//下载处理
app.use('/download',download);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

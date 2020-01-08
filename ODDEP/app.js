var pretest = require('./test/running-test');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var auth = require('./routes/auth');
var register = require('./routes/register');
var editor = require('./routes/editor');
var consumer = require('./routes/consumer');
var watcher = require('./routes/watcher');
var upload = require('./routes/upload');
var profile = require('./routes/profile');
var problem_view = require('./routes/problem-view');
var problem_edit = require('./routes/problem-edit');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (app.get('env') !== 'supertesting') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "taolidixiacheduir1",
}));
app.use(express.static(path.join(__dirname, 'public')));
// to use library managed by bower
app.use(express.static(path.join(__dirname, 'bower_components')));

// 模板装载会话信息
app.use(function(req, res, next) {
  res.locals.user = req.session.user || null;
  res.locals.nickname = req.session.nickname || null;
  res.locals.power = req.session.power || null;
  next();
});

app.use('/', routes);
app.use('/auth', auth);
app.use('/register', register);

//*
// 权限限制器 
app.use(function(req, res, next) {
  if (res.locals.user) {
    next();
  } else {
    res.redirect('/auth/login');
  }
}); // */

app.use('/upload', upload);
app.use('/profile', profile);
app.use('/editor', editor);
app.use('/problem/edit', problem_edit);
app.use('/problem', problem_view);
app.use('/submit', consumer);
app.use('/status', watcher);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// 纯信息，无调试
app.use(function(err, req, res, next) {
  if (err.pure) {
    res.status(err.status || 500)
    .send(err.message);
  } else {
    next(err);
  }
})

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

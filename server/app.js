var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const initPassport = require('./config/passport');
const initRoutes = require('./routes');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));

initPassport(passport);
initRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error
  res.status(err.status || 500)
    .json({
      message: err.message,
      status: err.status,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined
    });
});

module.exports = app;

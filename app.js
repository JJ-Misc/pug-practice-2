var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Log activity
app.use(logger('dev'));
// Use Express's native json() and urlencoded()
//!NOTE: How is this different from using body-parser?
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Parse cookies
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  //!NOTE: In production, don't set res.locals.error to err. Why not?
  //!NOTE: This line confuses me. Why is app inside the req object?
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // Set the status to the error status or default to generic server error
  res.status(err.status || 500);
  // Render the error template
  res.render('error');
});

module.exports = app;

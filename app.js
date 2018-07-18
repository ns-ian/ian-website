var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var lessMiddleware = require('less-middleware')
var logger = require('morgan')
var mongoose = require('mongoose')

var indexRouter = require('./routes/index')
var aboutRouter = require('./routes/about')
var contactRouter = require('./routes/contact')
var funRouter = require('./routes/fun')
var blogRouter = require('./routes/blog')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// database setup
var mongoDB = 'mongodb://localhost:27017/ian-db'
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise

// middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(lessMiddleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

// routers
app.use('/', indexRouter)
app.use('/about', aboutRouter)
app.use('/contact', contactRouter)
app.use('/fun', funRouter)
app.use('/blog', blogRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

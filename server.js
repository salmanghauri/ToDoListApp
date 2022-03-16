var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash');
require('dotenv').config();
let session = require('express-session');
let passport = require('./helper/ppConfig');

const app = express();
app.use(session({
  secret: process.env.secret,
  saveUninitialized: true,
  resave: false,
  cookie: {maxAge: 360000}
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var todoRouter = require('./routes/todo');

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
})
app.use('/users', usersRouter);
app.use('/', authRouter);
app.use('/', todoRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

mongoose.connect(process.env.mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
() => {
    console.log("mongodb connected successfully!");
});
//buffering error = database not connected properly (buffering timeout after 10000ms e.g.)
module.exports = app;

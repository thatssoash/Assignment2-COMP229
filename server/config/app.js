//third party packages

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//modules for Authentication

let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');



//database set up
let mongoose = require('mongoose');
let db = require('./db');

// point mongoose to the DB URI
mongoose.connect(db.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'Connection Error:'));
mongodb.once('open', () =>{
console.log('Connected to Mongodb...');
});

mongodb.once('connected', () =>{
  console.log('MongoDB Connected');
  });

mongodb.on('disconnected', () => {
  console.log('MongoDB Disconnected')
});

mongodb.on('reconnected', () => {
  console.log('MongoDB Reconnected')
});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactRouter = require('../routes/contact');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); // express --ejs

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//set up express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// set up flash
app.use(flash());

//initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//passport User config
//create user model

let userModel = require('../models/user');
let User = userModel.User;

//implement a User Auth Strategy

passport.use(User.createStrategy());

//serialize and deserialize user info

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact-list', contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

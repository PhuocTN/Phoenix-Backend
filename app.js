var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var authRouter = require('./routes/auth');
var landingPageRouter = require('./routes/landingPage');
const users = require('./data/users');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
    secret: 'keyboard cat', // secret key
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.db', dir: './db' })
}));
app.use(passport.authenticate('session'));

passport.serializeUser(function(user, callback) {
    process.nextTick(function() {
      callback(null, { id: user.id, email: user.email });
    });
});
  
passport.deserializeUser(function(user, callback) {
    process.nextTick(function() {
      return callback(null, user);
    });
});

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/landingPage', landingPageRouter);

module.exports = app;

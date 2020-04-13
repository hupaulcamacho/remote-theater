var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('./auth/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/Comments');
var viewerRouter = require('./routes/Viewer');
var authRouter = require('./routes/auth');
let genresRouter =require('./routes/genres');
let videosRouter = require('./routes/videos');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "SECRET",
    resave: false,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())


app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/video', viewerRouter);
app.use('/auth', authRouter);
app.use('/genres', genresRouter);
app.use('/videos', videosRouter);
app.use('/', indexRouter);

module.exports = app;


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UsersRouter');
var commentsRouter = require('./routes/comments');
let genresRouter =require('./routes/genres');
let videosRouter = require('./routes/videos');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/genres', genresRouter);
app.use('/videos', videosRouter);
app.use('/', indexRouter);

module.exports = app;

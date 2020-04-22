var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comments');
let genresRouter = require('./routes/genres');
let videosRouter = require('./routes/videos');
let showtimeRouter = require('./routes/showtimes')
var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/genres', genresRouter);
app.use('/api/videos', videosRouter);
app.use('/api/showtimes', showtimeRouter);
app.use('/', indexRouter);

module.exports = app;


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var session = require('express-session');
var passport = require('./auth/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/Comments');
var viewerRouter = require('./routes/Viewer');
var authRouter = require('./routes/auth');
let genresRouter =require('./routes/genres');
let videosRouter = require('./routes/videos');
let showtimeRouter = require('./routes/showtimes');
let tokenGenerator = require('./routes/tokenGenerator');
let preferenceRouter  =  require('./routes/preferences')
var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "SECRET",
    resave: false,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())



// app.use('/comments', commentsRouter);
// app.use('/video', viewerRouter);

app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/genres', genresRouter);
app.use('/api/videos', videosRouter);
app.use('/api/showtimes', showtimeRouter);
app.use('/api/getToken', tokenGenerator);
app.use('/api/preferences', preferenceRouter);

app.use('/api/auth', authRouter);
app.use('/', indexRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

module.exports = app;


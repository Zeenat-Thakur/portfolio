const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const InitiateMongoServer = require("./db/client");
const passport = require("passport"),
    User = require("./db/userModel"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")

InitiateMongoServer();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const aboutRouter = require('./routes/about');
const servicesRouter = require('./routes/services');
const portfolioRouter = require('./routes/portfolio');
const contactRouter = require('./routes/contact');
const loginRouter = require('./routes/login');
const businessListRouter = require('./routes/business_list');
const editBusinessContactRouter = require('./routes/edit_business_contact');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extend: true}))
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
    secret:"Hello World, this is a session",
    resave: false,
    saveUninitialized: false
}));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/services', servicesRouter);
app.use('/portfolio', portfolioRouter);
app.use('/contact', contactRouter);
app.use('/auth', loginRouter);
app.use('/business', businessListRouter);
app.use('/business', editBusinessContactRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;

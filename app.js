/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

require('dotenv').config();

var path = require('path');
var express = require('express');
var session = require('express-session');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require("helmet");

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var authRouter = require('./routes/auth');
var salasRouter = require('./routes/salas');
var reservasRouter = require('./routes/reservas');

// initialize express
var app = express();

/**
 * Using express-session middleware for persistent user session. Be sure to
 * familiarize yourself with available options. Visit: https://www.npmjs.com/package/express-session
 */
app.use(session({
    name: "MauaSalas",
    proxy: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true, // set this to true on production
        sameSite: "none",
    }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('common'));
app.use(express.json());
app.use(cookieParser());
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "script-src-elem": ["'self'", "tag.goadopt.io", "'sha256-"+process.env.ADOPT_SHA256+"'"],
                "script-src-attr": ["'unsafe-inline'"],
                "img-src": ["'self'", "https:", "data:"],
                "connect-src": ["'self'","disclaimer-api.goadopt.io"]
            },
        },
    })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/salas', salasRouter);
app.use('/auth', authRouter);
app.use('/reservas', reservasRouter);

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
    res.render('error', {
        url: process.env.POST_LOGOUT_REDIRECT_URI,
        adoptID: process.env.ADOPT_WEBSITE_ID,
        title: 'Mauá Salas - Erro',
        style: "/stylesheets/stylesHomePage.css",
        isAuthenticated: req.session.isAuthenticated,
        username: req.session.account && req.session.account.name,
        erro: (err.status || 500),
    });
});

module.exports = app;
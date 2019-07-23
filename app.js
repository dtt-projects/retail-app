/**
 * @module app.js
 * @fileoverview Server configuration that exports the Express object itself,
 *    which can be used in a different module (i.e. [www](bin/www) in the `bin`
 *    directory).
 */

// External Dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

// Internal Dependencies
const rootRouter = require('./routes/root');
const usersRouter = require('./routes/users');
const errorHandler = require('./routes/error');

// Base application.
const app = express();

// Security setup
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes.
app.use('/', rootRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(errorHandler);


module.exports = app;

/**
 * @module app.js
 * @fileoverview Server configuration that exports the Express object itself,
 *    which can be used in a different module (i.e. [www](bin/www) in the `bin`
 *    directory).
 * @exports {Express} An `Express` app instance.
 */

/**
 * From the `http-errors` module. Handle HTTP Errors with the `createError` module.
 */
const createError = require('http-errors');

/**
 * From the `exress module`. The Express library used to create an Express
 * object singleton.
 */
const express = require('express');

/** From the `path` module. Built-in path module to manipulate system paths. */
const path = require('path');

/** From the `cookie-parser` module. Parse incoming / outgoing cookies. */
const cookieParser = require('cookie-parser');

/** From the `morgan` module. Logging utility. */
const logger = require('morgan');

/**
 * From the `helmet` module. Security module used to protect against common
 * exploits listed on OWASP.
 */
const helmet = require('helmet');

/** The root path router defined in `./routes/root`. */
const rootRouter = require('./routes/root.router');

/** The user path router defined in `./routes/users`. */
const usersRouter = require('./routes/users.router');

/** The login path router defined in './routes/login'. */
const loginRouter = require('./routes/login.router');

/** The forgot password path router defined in './routes/forgot password'. */
const forgotPasswordRouter = require('./routes/forgotPassword.router');

/** The eat at the farm router defined in './routes/login'. */
const eatAtTheFarmRouter = require('./routes/eatAtTheFarm.router');

/** The supportPageRouter path router defined in './routes/supportPage'. */
const supportPageRouter = require('./routes/supportPage.router');

/** The adminDashboardRouter path router defined in './routes/supportPage'. */
const adminDashboardRouter = require('./routes/adminDashboard.router');

/** The cartPageRouter path router defined in './routes/supportPage'. */
const cartPageRouter = require('./routes/cartPage.router');

/** The checkOutRouter path router defined in './routes/supportPage'. */
const checkOutRouter = require('./routes/checkOutPage.router');

/** The marketPageRouter path router defined in './routes/supportPage'. */
const marketPageRouter = require('./routes/marketPage.router');

/** The userDashboardRouter path router defined in './routes/supportPage'. */
const userDashboardRouter = require('./routes/userDashboard.router');

/** The userDashboardRouter path router defined in './routes/supportPage'. */
const API_loginRouter = require('./routes/API_login.router');


/**
 * The error path router (which contains a single function as an error handler)
 * defined in `./routes/error`.
 */
const errorHandler = require('./routes/error.router');

/**
 * Express application instance.
 * @constant
 * @public
 * @memberof app.js
 */
const app = express();

/** Security setup */
app.use(helmet());

/** view engine setup */
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
app.use('/login', loginRouter);
app.use('/forgot_password', forgotPasswordRouter);
app.use('/eat_at_the_farm', eatAtTheFarmRouter);
app.use('/support', supportPageRouter);
app.use('/admin_dashboard', adminDashboardRouter);
app.use('/cart', cartPageRouter);
app.use('/check_out', checkOutRouter);
app.use('/market', marketPageRouter);
app.use('/user_dashboard', userDashboardRouter);
app.use('/api/login', API_loginRouter);



// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(errorHandler);


module.exports = app;

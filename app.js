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

/** From the 'express-session' module. Used to handle user sessions. */
//const sessions = require('express-session');

/** From the `morgan` module. Logging utility. */
const logger = require('morgan');

/**
 * From the `helmet` module. Security module used to protect against common
 * exploits listed on OWASP.
 */
const helmet = require('helmet');


// Basic GET routes

/** The root path router defined in `./routes/root`. */
const rootRouter = require('./routes/root.router');

/** The login path router defined in './routes/login'. */
const loginRouter = require('./routes/login.router');

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

/** The forgotPasswordRouter path router defined in './routes/forgotPassword'. */
const forgotPasswordRouter = require('./routes/forgotPassword.router');

/** The createAccountRouter path router defined in './routes/createAccount'. */
const createAccountRouter = require('./routes/createAccount.router');

/** aboutPageRouter path router defined in './routes/aboutPage'. */
const aboutPageRouter = require('./routes/aboutPage.router');

/** visitTheFarmPageRouter path router defined in './routes/visitTheFarmPage'. */
const visitTheFarmPageRouter = require('./routes/visitTheFarmPage.router');

/** summerCampPageRouter path router defined in './routes/summerCampPage'. */
const summerCampPageRouter = require('./routes/summerCampPage.router');

/** blogPageRouter path router defined in './routes/blogPage'. */
const blogPageRouter = require('./routes/blogPage.router');

/** contactPageRouter path router defined in './routes/contactPage'. */
const contactPageRouter = require('./routes/contactPage.router');




// Special routes

/** The marketItemPageRouter path router defined in './routes/marketItemPage'. */
const marketItemPageRouter = require('./routes/marketItemPage.router');

// API routes

/** The API_forgotPasswordRouter path router defined in './routes/API_forgotPassword'. */
const API_forgotPasswordRouter = require('./routes/API_forgotPassword.router');

/** The API_createAcoountRouter path router defined in './routes/API_createAccount'. */
const API_createAccountRouter = require('./routes/API_createAccount.router');

/** The API_loginRouter path router defined in './routes/API_login'. */
const API_loginRouter = require('./routes/API_login.router');


// Testing routes
const print_cookiesRouter = require('./routes/print_cookies.router');

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
app.use('/login', loginRouter);
app.use('/eat_at_the_farm', eatAtTheFarmRouter);
app.use('/support', supportPageRouter);
app.use('/admin_dashboard', adminDashboardRouter);
app.use('/cart', cartPageRouter);
app.use('/check_out', checkOutRouter);
app.use('/market', marketPageRouter);
app.use('/user_dashboard', userDashboardRouter);
app.use('/forgot_password', forgotPasswordRouter);
app.use('/create_account', createAccountRouter);
app.use('/about', aboutPageRouter);
app.use('/visitTheFarm', visitTheFarmPageRouter);
app.use('/summerCamp', summerCampPageRouter);
app.use('/blog', blogPageRouter);
app.use('/contact', contactPageRouter);

// Special routes
app.use('/marketItem/:itemId', marketItemPageRouter);

// API routes
app.use('/api/login', API_loginRouter);
app.use('/api/forgot_password', API_forgotPasswordRouter);
app.use('/api/create_account', API_createAccountRouter);

// testing
app.use('/print_cookies', print_cookiesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(errorHandler);


module.exports = app;

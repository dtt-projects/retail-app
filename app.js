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

//var sessions = require('./bin/www');

/** From the `morgan` module. Logging utility. */
const logger = require('morgan');

/**
 * From the `helmet` module. Security module used to protect against common
 * exploits listed on OWASP.
 */
const helmet = require('helmet');


// Basic GET routes
/** The root path router defined in `./routes/root`. */
const rootPageRouter = require('./routes/root.router');

/** The login path router defined in './routes/login'. */
const loginPageRouter = require('./routes/loginPage.router');

/** The eat at the farm router defined in './routes/eatAtTheFarm'. */
const eatAtTheFarmPageRouter = require('./routes/eatAtTheFarmPage.router');

/** The supportPageRouter path router defined in './routes/supportPage'. */
const supportPageRouter = require('./routes/supportPage.router');

/** The cartPageRouter path router defined in './routes/cartPage'. */
const cartPageRouter = require('./routes/cartPage.router');

/** The checkOutRouter path router defined in './routes/checkOutPage'. */
const checkOutPageRouter = require('./routes/checkOutPage.router');

/** The marketPageRouter path router defined in './routes/marketPage'. */
const marketPageRouter = require('./routes/marketPage.router');

/** The forgotPasswordRouter path router defined in './routes/forgotPassword'. */
const forgotPasswordPageRouter = require('./routes/forgotPasswordPage.router');

/** The createAccountRouter path router defined in './routes/createAccount'. */
const createAccountPageRouter = require('./routes/createAccountPage.router');

// User routes
/** The userDashboardRouter path router defined in './routes/userDashboard'. */
const userDashboardPageRouter = require('./routes/userDashboardPage.router');

/** The userDashboardViewOrdersRouter path router defined in './routes/userDashboardViewOrders'. */
const userDashboardViewOrdersPageRouter = require('./routes/userDashboardViewOrdersPage.router');

/** The userDashboardEditInfoRouter path router defined in './routes/userDashboardEditInfo'. */
const userDashboardEditInfoPageRouter = require('./routes/userDashboardEditInfoPage.router');



// Admin Routes
/** The adminDashboardRouter path router defined in './routes/adminDashboard'. */
const adminDashboardPageRouter = require('./routes/adminDashboardPage.router');

/** The adminDashboardManageInvertoryRouter path router defined in './routes/adminDashboardManageInvertory'. */
const adminDashboardManageInventoryPageRouter = require('./routes/adminDashboardManageInventoryPage.router');

/** adminDashboardManageInventorySubInventoryPageRouter path router defined in './routes/adminDashboardManageInventorySubInventoryPage'. */
const adminDashboardManageInventorySubInventoryPageRouter = require('./routes/adminDashboardManageInventorySubInventoryPage.router');

/** adminDashboardManageInventoryCreateInventoryPageRouter path router defined in './routes/adminDashboardManageInventoryCreateInventoryPage'. */
const adminDashboardManageInventoryCreateInventoryPageRouter = require('./routes/adminDashboardManageInventoryCreateInventoryPage.router');

/** The adminDashboardManageOrdersRouter path router defined in './routes/adminDashboardManageOrders'. */
const adminDashboardManageOrdersPageRouter = require('./routes/adminDashboardManageOrdersPage.router');

/** adminDashboardManageOrdersSubOrderPageRouter path router defined in './routes/adminDashboardManageOrdersSubOrderPage'. */
const adminDashboardManageOrdersSubOrderPageRouter = require('./routes/adminDashboardManageOrdersSubOrderPage.router');

/** The adminDashboardManageAccountsRouter path router defined in './routes/adminDashboardManageAccounts'. */
const adminDashboardManageAccountsPageRouter = require('./routes/adminDashboardManageAccountsPage.router');

/** adminDashboardManageAccountsSubAccountPageRouter path router defined in './routes/adminDashboardManageAccountsSubAccountPage'. */
const adminDashboardManageAccountsSubAccountPageRouter = require('./routes/adminDashboardManageAccountsSubAccountPage.router');

/** adminDashboardManageAccountsCreateAccountPageRouter path router defined in './routes/adminDashboardManageAccountsCreateAccountPage'. */
const adminDashboardManageAccountsCreateAccountPageRouter = require('./routes/adminDashboardManageAccountsCreateAccountPage.router');



// Special routes
/** The marketItemPageRouter path router defined in './routes/marketItemPage'. */
const marketItemPageRouter = require('./routes/marketItemPage.router');



// API routes
/** The API_forgotPasswordRouter path router defined in './routes/API_forgotPassword'. */
const API_forgotPasswordRouter = require('./routes/API_forgotPassword.router');

/** The API_createAccountRouter path router defined in './routes/API_createAccount'. */
const API_createAccountRouter = require('./routes/API_createAccount.router');

/** The API_updateAccountRouter path router defined in './routes/API_updateAccount'. */
const API_updateAccountRouter = require('./routes/API_updateAccount.router');

/** The API_getAccountRouter path router defined in './routes/API_getAccount'. */
const API_getAccountRouter = require('./routes/API_getAccount.router');

/** The API_getAllAccountsRouter path router defined in './routes/API_getAllAccounts'. */
const API_getAllAccountsRouter = require('./routes/API_getAllAccounts.router');

/** The API_loginRouter path router defined in './routes/API_login'. */
const API_loginRouter = require('./routes/API_login.router');

/** The API_addItemRouter path router defined in './routes/API_addItem'. */
const API_addItemRouter = require('./routes/API_addItem.router');

/** The API_getItemsrouter path router defined in './routes/API_getItems'. */
const API_getItemsRouter = require('./routes/API_getItems.router');

/** The API_updateItemRouter path router defined in './routes/API_updateItem'. */
const API_updateItemRouter = require('./routes/API_updateItem.router');

/** The API_getItemRouter path router defined in './routes/API_getItem'. */
const API_getItemRouter = require('./routes/API_getItem.router');

/** The API_getGoatPoints path router defined in './routes/API_getGoatPoints'. */
const API_getGoatPointsRouter = require('./routes/API_getGoatPoints.router');

/** The API_addToCart path router defined in './routes/API_addToCart'. */
const API_addToCartRouter = require('./routes/API_addToCart.router')

/** The API_removeFromCart path router defined in './routes/API_removeFromCart'. */
const API_removeFromCartRouter = require('./routes/API_removeFromCart.router')


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
app.use('/', rootPageRouter);
app.use('/login', loginPageRouter);
app.use('/eat_at_the_farm', eatAtTheFarmPageRouter);
app.use('/support', supportPageRouter);
app.use('/cart', cartPageRouter);
app.use('/check_out', checkOutPageRouter);
app.use('/market', marketPageRouter);
app.use('/forgot_password', forgotPasswordPageRouter);
app.use('/create_account', createAccountPageRouter);

// User Dashboard
app.use('/user_dashboard', userDashboardPageRouter);
app.use('/user_dashboard/view_orders', userDashboardViewOrdersPageRouter);
app.use('/user_dashboard/edit_information', userDashboardEditInfoPageRouter);

// Admin Dashboard
app.use('/admin_dashboard',
  adminDashboardPageRouter);
app.use('/admin_dashboard/manage_inventory',
  adminDashboardManageInventoryPageRouter);
app.use('/admin_dashboard/manage_inventory/sub_inventory/:iid',
  adminDashboardManageInventorySubInventoryPageRouter);
app.use('/admin_dashboard/manage_inventory/create_inventory',
  adminDashboardManageInventoryCreateInventoryPageRouter);
app.use('/admin_dashboard/manage_orders',
  adminDashboardManageOrdersPageRouter);
app.use('/admin_dashboard/manage_orders/sub_order/:oid',
  adminDashboardManageOrdersSubOrderPageRouter);
app.use('/admin_dashboard/manage_accounts',
  adminDashboardManageAccountsPageRouter);
app.use('/admin_dashboard/manage_accounts/sub_account/:aid',
  adminDashboardManageAccountsSubAccountPageRouter);
app.use('/admin_dashboard/manage_accounts/create_account',
  adminDashboardManageAccountsCreateAccountPageRouter);

// Special Routes
app.use('/marketItem/:itemId', marketItemPageRouter);

// API Routes
app.use('/api/login', API_loginRouter);
app.use('/api/forgot_password', API_forgotPasswordRouter);
app.use('/api/create_account', API_createAccountRouter);
app.use('/api/updateAccount', API_updateAccountRouter);
app.use('/api/getAccount', API_getAccountRouter);
app.use('/api/getAllAccounts', API_getAllAccountsRouter);
app.use('/api/addItem', API_addItemRouter);
app.use('/api/getItem/:itemId', API_getItemRouter);
app.use('/api/getItems', API_getItemsRouter);
app.use('/api/updateItem', API_updateItemRouter);
app.use('/api/getGoatPoints', API_getGoatPointsRouter);
app.use('/api/addToCart', API_addToCartRouter);
app.use('/api/API_removeFromCart', API_removeFromCartRouter);




// TESTING
app.use('/print_cookies', print_cookiesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(errorHandler);


module.exports = app;

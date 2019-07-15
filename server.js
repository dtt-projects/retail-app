/**
 * @module web/server.js
 * @fileOverview Entry point for the server. All dependencies being used are
 *               listed here. Exports a server (Express) object to be called
 *               by a launch/execution script.
 *
 * @requires YARN:express
 * @requires NPM:path
 * @requires YARN:cookie-parser
 * @requires YARN:morgan
 * @requires YARN:helmet
 * @requires ./router/root
 * @requires ./router/api
 * @requires ./router/errors
 * @exports server
 */

// External Dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Internal Dependencies
const path = require('path');
const debug = require('debug')('server:server');
const serverErrors = require('./web/router/errors');

// Debugger.
debug('process env is ', process.env.NODE_ENV);

// Server object
const server = express();

// Server security config
require('./config/security')(server);

// Server object configuration
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

// Set static assets.
server.use(express.static(path.resolve('apar-checklist-frontend/build')));

// Routes
server.use('/', homeRoute);
server.use('/api/v1/apars', aparRoute);

// Error handler
server.use(serverErrors.errorRouter);

/**
 * Exporting a single object, the server (Express) object.
 */
module.exports = server;

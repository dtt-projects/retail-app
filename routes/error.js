/**
 * @module routes/error.js
 * @fileoverview Error handler function
 * @exports Function
 */

/**
 * @function ErrorHandler
 * @description Handle an error based on the running Node environment
 * @param {Error} err The received error object.
 * @param {Object} req The `Request` object from express.
 * @param {Object} res The `Response` object from express.
 * @param {Function} next The `next` Function to call (next middleware function).
 */
module.exports = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { error: res.locals.error });
}
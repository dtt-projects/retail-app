/**
 * @module public/javascripts/client.js
 * @fileoverview Front-end code in case interactivity or any JavaScript-related
 *    functionalities are required.
 * @exports {null} No front-end code exported to back-end.
 */


// NOTE: Even if the script (JavaScript tag) exists at the very bottom of the
// webpage, a HTML element may not finish loading before the JavaScript is run,
// resulting in an error. Therefore, we want to make sure the webpage finishes
// loading FIRST, then perform any JavaScript-based actions on top of the DOM.


// Determine if the DOM has already finished loading or not. If it has, then we
// should just call main directly. Otherwise, we want to wait until the page
// has loaded by adding an event listener.
if (document.readyState !== 'loading') {
  // Call `main`.
  main();
}
else {
  // Add an event listener to capture when the page has loaded.
  document.addEventListener('DOMContentLoaded', () => {
    // The webpage has loaded, we should now call the main function and perform
    // any and all operations needed by the client page.
    main();
  });
}

/**
 * @function main
 * @description First function called after DOM has loaded. Attach listeners and
 *    call other important functions here.
 * @public
 */
function main() {
  // Add your code here.
}

/**
 * @function sayHello
 * @description Alert the user with a message using the built-in `alert` function.
 */
function sayHello() {
  alert('You triggered a Javascript-based alert!');
}
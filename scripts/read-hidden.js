/**
 * @module scripts/read-hidden.js
 * @fileoverview A helper file for reading hidden files
 * @exports readHidden this is the function for reading hidden credientials
 */

/**
 * @function readHidden
 * @description This reads the hiddenCreds file for hidden content
 * @param None
 */
exports.readHidden = function() {
  return new Promise(function(resolve, reject) {
    const fs = require("fs");
    fs.readFile('hiddenCreds', (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        json = JSON.parse(data.toString());
        resolve(json);
      }
    });
  });
}


// reads the hidden files
exports.readHidden = function() {
  return new Promise(function(resolve, reject) {
    const fs = require("fs");
    fs.readFile('.hiddenCreds', (err, data) => {
      if (err) {
        reject(err)
        throw err;
      } else {
        json = JSON.parse(data.toString());
        resolve(json);
      }
    });
  });
}

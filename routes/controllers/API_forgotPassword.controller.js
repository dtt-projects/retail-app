/**
 * @module routes/controllers/API_forgotPassword
 * @fileoverview API_forgotPassword route's controller. Handle all business
 * logic relative to resetting a password.
 * @exports {Object} Functions to attach to the `users` router.
 */


/**
 * @function forgotPassword
 * @description Send a reset password email based on client formt.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done
 * executing and does not return or render anything (no `res` methods called).
 */
const forgotPassword = (req, res, next) => {
  // Get the secret creds from the file
  const fs = require("fs");
  fs.readFile('hiddenCreds', (err, data) => {
      if (err) {
        console.log(err);
        res.setHeader('Content-Type', 'plain/text');
        res.status(400);
        res.send("forgot password failed!");
      } else {
        json = JSON.parse(data.toString());
        var email = req.body["email"];
        var mysql = require("mysql");

        // connect to the database from secret file
        var con = mysql.createConnection({
          host: json[0]["host"],
          user: json[0]["user"],
          password: json[0]["password"],
          database: json[0]["database"]
        });

        // open up a database connection
        con.connect(function(err) {
          if (err) {
            res.setHeader('Content-Type', 'plain/text');
            res.redirect("/forgot_password");
            console.log(err);
          }
        });

        // statement to check if the email exists in the system
        statement = ("SELECT * FROM accounts WHERE email = '" + email + "'");
        con.query(statement, function(err, result) {
          if (err) {
            console.log("err");
            res.setHeader('Content-Type', 'plain/text');
            res.status(400);
            res.send("email failed!");
          } else {
            if (result.length > 0) {

              // required for building email and new password
              var nodemailer = require('nodemailer');
              var crypto = require('crypto');

              // make new temp password
              // from bytes and convert to string
              var newpw = crypto.randomBytes(50);
              newpw = newpw.toString('hex');
              statement = ("UPDATE accounts SET "
                  + "UPDATEDDATE='CURRENT_TIMESTAMP', "
                  + "password ='" + newpw.toString()
                  + "' WHERE email ='" + email + "'");

              con.query(statement, function(err, result) {
                if (err) {
                  res.setHeader('Content-Type', 'plain/text');
                  res.status(400);
                  res.send("email failed!");
                  console.log(err);
                } else {
                  //console.log(result);
                  // setup email by connecting
                  var transporter = nodemailer.createTransport({
                    service: 'gmail',
                      auth: {
                        user: json[1]["email"],
                        pass: json[1]["password"]
                      }
                  });

                  // email content with new password
                  var email_text = "Your new password is: " + newpw.toString();

                  // setup to and from
                  var mailOptions = {
                    from: 'compscigoat@gmail.com',
                    to:   email,
                    subject: 'Sending Email using Node.js',
                    text: email_text
                  };

                  // send the email with the new password
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    }
                  });
                  // send success to client
                  res.setHeader('Content-Type', 'plain/text');
                  res.status(200);
                  res.redirect("/login");
              }
            });
          } else {
            res.setHeader('Content-Type', 'plain/text');
            res.status(400);
            res.redirect("/forgot_password");
          }
        }
      });
    }
  });
};


// accessable from outside files
module.exports = {
  forgotPassword,
};

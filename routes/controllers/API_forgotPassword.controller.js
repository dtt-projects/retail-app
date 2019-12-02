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
                  var email_text = '<!DOCTYPE html><html lang="en"><head><title>Forgot Password - Sprout Creek Farm</title><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style type="text/css"> /* CLIENT-SPECIFIC STYLES */ #outlook a{padding:0;} /* Force Outlook to provide a "view in browser" message */ .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */ .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing */ body, table, td, a{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */ table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */ img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */ /* RESET STYLES */ body{margin:0; padding:0;} img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;} table{border-collapse:collapse !important;} body{height:100% !important; margin:0; padding:0; width:100% !important;} /* iOS BLUE LINKS */ .appleBody a {color:#68440a; text-decoration: none;} .appleFooter a {color:#999999; text-decoration: none;} /* MOBILE STYLES */ @media screen and (max-width: 525px) { /* ALLOWS FOR FLUID TABLES */ table[class="wrapper"]{ width:100% !important; } /* ADJUSTS LAYOUT OF LOGO IMAGE */ td[class="logo"]{ text-align: left; padding: 20px 0 20px 0 !important; } td[class="logo"] img{ margin:0 auto!important; } /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */ td[class="mobile-hide"]{ display:none;} img[class="mobile-hide"]{ display: none !important; } img[class="img-max"]{ max-width: 100% !important; height:auto !important; } /* FULL-WIDTH TABLES */ table[class="responsive-table"]{ width:100%!important; } /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */ td[class="padding"]{ padding: 10px 5% 15px 5% !important; } td[class="padding-copy"]{ padding: 10px 5% 10px 5% !important; text-align: center; } td[class="padding-meta"]{ padding: 30px 5% 0px 5% !important; text-align: center; } td[class="no-pad"]{ padding: 0 0 20px 0 !important; } td[class="no-padding"]{ padding: 0 !important; } td[class="section-padding"]{ padding: 50px 15px 50px 15px !important; } td[class="section-padding-bottom-image"]{ padding: 50px 15px 0 15px !important; } /* ADJUST BUTTONS ON MOBILE */ td[class="mobile-wrapper"]{ padding: 10px 5% 15px 5% !important; } table[class="mobile-button-container"]{ margin:0 auto; width:100% !important; } a[class="mobile-button"]{ width:80% !important; padding: 15px !important; border: 0 !important; font-size: 16px !important; } }</style></head><body style="margin: 0; padding: 0;"><!-- HEADER --><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#fffaf1"> <div align="center" style="padding: 0px 15px 0px 15px;"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="wrapper"> <!-- LOGO/PREHEADER TEXT --> <tr> <td style="padding: 20px 0px 30px 0px;" class="logo"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#fffaf1" width="300" align="center"><a href="http://35.223.198.82:9520" target="_blank"><img alt="Logo" src="https://sproutcreekfarm.org/sites/all/themes/sproutcreek/logo.png" width="150" height="150" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #666666; font-size: 16px;" border="0"></a></td> </tr> </table> </td> </tr> </table> </div> </td> </tr></table><!-- ONE COLUMN SECTION --><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#fffdfa" align="center" style="padding: 20px 15px 30px 15px;" class="section-padding"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <!-- COPY --> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td align="center" style="font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 10px;" class="padding-copy">Forgot Your Password?</td> </tr> <tr> <td align="center" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">We get it, things happen.</td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr></table><!-- ONE COLUMN W/ BOTTOM IMAGE SECTION --><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#fffdfa" align="center" style="padding: 40px 15px 40px 15px;" class="section-padding-bottom-image"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <!-- COPY --> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td align="center" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #333333;" class="padding-copy">Your Temporary Password Is: ' + newpw.toString() + '</td> </tr> <tr> <td align="center" style="padding: 30px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">{Temp Password}}</td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr></table><!-- TWO COLUMN SECTION --><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#fffdfa" align="center" style="padding: 40px 15px 20px 15px;" class="section-padding"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table"> <tr> <td> <!-- TITLE SECTION AND COPY --> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td align="center" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #333333;" class="padding-copy">Next Steps</td> </tr> <tr> <td align="center" style="padding: 20px 0 20px 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Login to your Sprout Creek Farm account with your username and temporary password. After that, navigate to the Account Details page on your dashboard and change your password as soon as possible.</td> </tr> </table> </td> </tr> </table> </td> </tr> <tr> <td style="padding:0 0 25px 25px;" align="center" class="padding" bgcolor="#fffdfa"> <table border="0" cellspacing="0" cellpadding="0" class="mobile-button-container"> <tr> <td align="center"> <!-- BULLETPROOF BUTTON --> <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mobile-button-container"> <tr> <td align="center" style="padding: 0;" class="padding-copy"> <table border="0" cellspacing="0" cellpadding="0" class="responsive-table"> <tr> <td align="center"><a href="http://35.223.198.82:9520/login" target="_blank" style="font-size: 15px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff; text-decoration: none; background-color: #4f7960; border-top: 10px solid #4f7960; border-bottom: 10px solid #4f7960; border-left: 20px solid #4f7960; border-right: 20px solid #4f7960; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; display: inline-block;" class="mobile-button">Login &rarr;</a></td> </tr> <tr> <td align="center" style="padding: 40px 0 20px 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">For any further inquiry, you can e-mail us at: info@sproutcreekfarm.org</td> </tr> <tr> <td align="center" style="padding: 40px 0 20px 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Have a great day!</td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr></table><!-- TWO COLUMN SECTION --><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#905d33" align="center" style="padding: 40px 15px 20px 15px;" class="section-padding"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table"> <tr> <td> <!-- TITLE SECTION AND COPY --> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td align="center" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff;" class="padding-copy">Cannot Make It To The Farm?</td> </tr> <tr> <td align="center" style="padding: 20px 0 20px 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #ffffff;" class="padding-copy">Follow us on your favorite social media platorm to see what\'s happening on the farm!</td> </tr> </table> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#905d33" style="padding:0 0 25px 25px;" align="center" class="padding"> <table border="0" cellspacing="0" cellpadding="0" class="mobile-button-container"> <tr> <td align="center"> <!-- BULLETPROOF BUTTON --> <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mobile-button-container"> <tr> <td align="center" style="padding: 0;" class="padding-copy"> <table border="0" cellspacing="0" cellpadding="0" class="responsive-table"> <tr> <td bgcolor="#905d33" width="105" align="center"><a href="https://www.facebook.com/sproutcreekfarm/" target="_blank"><img alt="Logo" src="https://sproutcreekfarm.org/sites/all/themes/sproutcreek/images/fb.png" width="35" height="35" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #666666; font-size: 16px;" border="0"></a></td> <td bgcolor="#905d33" width="105" align="center"><a href="https://twitter.com/sproutcreekfarm?lang=en" target="_blank"><img alt="Logo" src="https://sproutcreekfarm.org/sites/all/themes/sproutcreek/images/tw.png" width="35" height="35" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #666666; font-size: 16px;" border="0"></a></td> <td bgcolor="#905d33" width="105" align="center"><a href="https://www.instagram.com/sproutcreekfarm/?hl=en" target="_blank"><img alt="Logo" src="https://sproutcreekfarm.org/sites/all/themes/sproutcreek/images/insta.png" width="35" height="35" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #666666; font-size: 16px;" border="0"></a></td> <td bgcolor="#905d33" width="105" align="center"><a href="https://www.pinterest.com/pin/304204149807681044/" target="_blank"><img alt="Logo" src="https://sproutcreekfarm.org/sites/all/themes/sproutcreek/images/pi.png" width="35" height="35" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #666666; font-size: 16px;" border="0"></a></td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr></table><!-- FOOTER --><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center"> <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"> <tr> <td bgcolor="#905d33" style="padding: 20px 0px 20px 0px;"> <!-- UNSUBSCRIBE COPY --> <table width="500" border="0" cellspacing="0" cellpadding="0" align="center" class="responsive-table"> <tr> <td align="center" valign="middle" style="font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#905d33;"> <span class="appleFooter" style="color:#ffffff;">34 Lauer Road, Poughkeepsie, New York, 12603, USA</span></br> <span class="appleFooter" style="color:#ffffff;">Inquiry Phone Number: +1 (845) 485-8438 | E-Mail: info@sproutcreekfarm.org</span> </td> </tr> </table> </td> </tr> </table> </td> </tr></table></body></html>'

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

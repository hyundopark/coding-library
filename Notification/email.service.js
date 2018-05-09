module.exports = {
    sendEmail: sendEmail
  };
  
  function sendEmail(body) {
    const sendgrid = require("sendgrid")(process.env.SENDGRID_API_KEY);
    return new Promise(function(resolve, reject) {
      sendgrid.send(body, function callBack(err, json) {
        if (err) {
          reject(err);
          return console.error(err);
        } else {
          resolve(json);
          console.log(json);
        }
      });
    });
  }
  
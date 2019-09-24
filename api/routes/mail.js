const express = require("express"); //imported the package
const nodemailer = require("nodemailer");
const router = express.Router();
const Mail = require("../models/mail");

router.post("/", async (req, res) => {
  try {
    //config
    var transfer = nodemailer.createTransport({
      service: "gmail", //mail service (hotmail,gmail,yahoo)
      // some services doesn't allow you to use their service on your apps
      // they concider your app as  a low secured app .
      // we need to give permission to mail-service
      auth: {
        //auth details
        user: "mailexample09@gmail.com",
        pass: "09examplemail"
      }
    });
    /*
    //req body
    var mailContent = {
      from: "mailexample09@gmail.com", //
      to: "necatisarhanli@gmail.com",
      subject: "ddddd",
      text: "text",
      html: "<h1>deneme html</h1>"
    };
*/
    // this is where we actualy send the mail
    transfer.sendMail(req.body, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("mail gönderildi");
      }
    });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

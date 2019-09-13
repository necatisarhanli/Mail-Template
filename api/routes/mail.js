const express = require("express"); //imported the package
const nodemailer = require("nodemailer");
const router = express.Router();
const Mail = require("../models/mail");

router.post("/", async (req, res) => {
  const newMail = new Mail({
    from: "mailexample09@gmail.com",
    to: "necatisarhanli@gmail.com",
    subject: req.body.subject,
    text: req.body.content
  });

  try {
    var transfer = nodemailer.createTransport({
      service: "gmail", //mail servisi
      auth: {
        //gönderen bigileri
        user: "mailexample09@gmail.com",
        pass: "09examplemail"
      }
    });

    var mailContent = {
      from: "mailexample09@gmail.com", //bunuda dene transfer.auth.user
      to: "necatisarhanli@gmail.com",
      subject: "ddddd",
      text: "eeeee"
    };

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

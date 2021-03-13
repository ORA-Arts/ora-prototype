const router = require("express").Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",  
  secureConnection: true,
  port:587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

transporter.verify(function (err, success) {
  if (err) {
    console.log('not found error? ' + err);
  } else {
    console.log("Server is ready to take our messages")
  }
})

router.post('/', (req, res) => {
  const { name, email, topic, body } = req.body
  const name2 = `${name} <${email}>`
  const mail = {
    from: name,
    replyTo: email,
    sender: email,
    to: process.env.EMAIL,
    subject: topic,
    text: body,
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong.");
    } else {
      console.log("Email successfully sent to recipient!", data);
    }
  });
});

module.exports = router;

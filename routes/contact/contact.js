const router = require("express").Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email", //replace with your email provider
  port: 587,
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
  const mail = {
    from: name,
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

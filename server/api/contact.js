const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res, next) => {
  const { name, email, phone, comments } = req.body;

  // Set up your Nodemailer transporter for Outlook
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.OUTLOOK_EMAIL,
      pass: process.env.OUTLOOK_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.OUTLOOK_EMAIL,
    to: process.env.OUTLOOK_EMAIL,
    subject: "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nComments: ${comments}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

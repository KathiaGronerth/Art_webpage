const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { EmailSetting } = require("../db/models");

router.post("/", async (req, res, next) => {
  const { name, email, phone, comments } = req.body;

  try {
    const settings = await EmailSetting.findOne();
    if (!settings) {
      return res.status(500).send("Email settings not configured");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: settings.email,
        pass: settings.password,
      },
    });

    const mailOptions = {
      from: settings.email,
      to: settings.email,
      subject: "Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nComments: ${comments}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

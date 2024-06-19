const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { models } = require("../db/models");
const { Mail } = models;

router.post("/", async (req, res, next) => {
  const { name, email, phone, comments } = req.body;

  try {
    const settings = await Mail.findOne();
    if (!settings) {
      console.error("Email settings not configured");
      return res.status(500).send("Email settings not configured");
    }

    console.log("Email Settings:", settings.email, settings.password);

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
    console.error("Error sending email:", error.message);
    if (error.response && error.response.status === 535) {
      res
        .status(500)
        .send("Authentication Error: Check your email credentials");
    } else {
      res.status(500).send("Error sending email: " + error.message);
    }
    next(error);
  }
});

module.exports = router;

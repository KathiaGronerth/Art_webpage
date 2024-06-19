const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { models } = require("../db/models");
const { Mail } = models;

router.get("/", async (req, res, next) => {
  try {
    const settings = await Mail.findOne();
    if (settings) {
      console.log("Email settings:", settings);
      res.status(200).json(settings);
    } else {
      res.status(404).send("Email settings not found");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone, comments } = req.body;

  try {
    const settings = await Mail.findOne();
    if (!settings) {
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
      console.error("Authentication Error:", error.response.data);
      res
        .status(500)
        .send("Authentication Error: Check your email credentials");
    } else {
      console.error("General Error:", error.message);
      res.status(500).send("Error sending email: " + error.message);
    }
    next(error);
  }
});

module.exports = router;

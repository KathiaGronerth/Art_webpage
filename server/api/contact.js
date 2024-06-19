const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { models } = require("../db/models");
const { Mail } = models;

// router.get("/", async (req, res, next) => {
//   try {
//     const settings = await Mail.findOne();
//     if (settings) {
//       console.log("Email settings:", settings);
//       res.status(200).json(settings);
//     } else {
//       res.status(404).send("Email settings not found");
//     }
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/", async (req, res, next) => {
  const { name, email, phone, comments } = req.body;

  try {
    const settings = await Mail.findOne();
    if (!settings) {
      return res.status(500).send("Email settings not configured");
    }

    console.log("Email Settings:", settings.email, settings.password);

    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.OUTLOOK_EMAIL,
        pass: process.env.OUTLOOK_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.OUTLOOK_EMAIL,
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

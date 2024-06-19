const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { models } = require("../db/models");
const { User, Mail } = models;

// User login
router.post("/login", async (req, res) => {
  console.log("Request Body:", req.body); // Log the request body
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).send("Email or password is wrong");

    const validPass = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", validPass);
    if (!validPass) return res.status(400).send("Invalid password");

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.TOKEN_SECRET
    );
    res.header("authorization", token).send({ token });
  } catch (err) {
    console.error("Server error:", err); // Debugging line
    res.status(500).send("Internal Server Error");
  }
});

// Update user password
router.post("/update-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).send("User not found");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    // Update Mail model with new password
    const mailSettings = await Mail.findOne();
    if (mailSettings) {
      await mailSettings.update({ email, password: newPassword });
    } else {
      await Mail.create({ email, password: newPassword });
    }

    res.status(200).send("Password updated successfully");
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

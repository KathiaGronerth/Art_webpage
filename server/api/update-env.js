const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const envFilePath = path.join(__dirname, "../../.env");
  const newEnvContent = `OUTLOOK_EMAIL=${email}\nOUTLOOK_PASSWORD=${password}\n`;

  fs.writeFile(envFilePath, newEnvContent, (err) => {
    if (err) {
      console.error("Error writing to .env file:", err);
      return res.status(500).send("Internal server error");
    }

    res.status(200).send("Environment variables updated successfully");
  });
});

module.exports = router;

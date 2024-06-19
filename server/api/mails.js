const router = require("express").Router();
const { models } = require("../db/models");
const { Mail } = models;
const authenticateToken = require("../middleware/auth");

router.get("/", authenticateToken, async (req, res, next) => {
  try {
    const settings = await Mail.findOne();
    if (settings) {
      console.log("Email settings retrieved:", settings);
      res.status(200).json(settings);
    } else {
      res.status(404).send("Email settings not found");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticateToken, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const settings = await Mail.findOne();
    if (settings) {
      await settings.update({ email, password });
      console.log("Email settings updated:", { email, password });
    } else {
      await Mail.create({ email, password });
      console.log("Email settings created:", { email, password });
    }
    res.status(200).send("Email settings updated successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

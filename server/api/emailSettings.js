const router = require("express").Router();
const { models } = require("../db/models");
const { Emailsetting } = models;

router.get("/", async (req, res, next) => {
  try {
    const settings = await Emailsetting.findOne();
    if (settings) {
      res.status(200).json(settings);
    } else {
      res.status(404).send("Email settings not found");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const settings = await Emailsetting.findOne();
    if (settings) {
      await settings.update({ email, password });
    } else {
      await Emailsetting.create({ email, password });
    }
    res.status(200).send("Email settings updated successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

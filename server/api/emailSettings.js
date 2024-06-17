const router = require("express").Router();
const { models } = require("../db/models");
const { EmailSetting } = models;

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const settings = await EmailSetting.findOne();
    if (settings) {
      await settings.update({ email, password });
    } else {
      await EmailSetting.create({ email, password });
    }
    res.status(200).send("Email settings updated successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

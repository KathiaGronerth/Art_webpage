const router = require("express").Router();
const { models } = require("../db/models");
const { Mail } = models;

// router.get("/", async (req, res, next) => {
//   try {
//     const settings = await Mail.findOne();
//     if (settings) {
//       res.status(200).json(settings);
//     } else {
//       res.status(404).send("Email settings not found");
//     }
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const settings = await Mail.findOne();
    if (settings) {
      await settings.update({ email, password });
    } else {
      await Mail.create({ email, password });
    }
    res.status(200).send("Email settings updated successfully");
  } catch (error) {
    console.error("Error updating email settings:", error);
    res.status(500).send("Failed to update email settings");
    next(error);
  }
});

module.exports = router;

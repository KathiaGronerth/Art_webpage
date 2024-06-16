const router = require("express").Router();
const {
  models: { User },
} = require("../db/models");

// Login route
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && user.password === password) {
      // In a real application, use bcrypt to compare hashed passwords
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    next(error);
  }
});

// Register route
router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password }); // In a real application, hash the password before storing
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
});

// Update password route
router.post("/update-password", async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      user.password = newPassword; // In a real application, hash the new password before storing
      await user.save();
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

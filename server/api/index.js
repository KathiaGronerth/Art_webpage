const router = require("express").Router();
module.exports = router;

router.use("/products", require("./products"));
router.use("/contact", require("./contact"));
router.use("/upload", require("./upload"));
router.use("/update-env", require("./update-env"));
router.use("/emailsettings", require("./emailsettings"));

require("dotenv").config();
console.log("OUTLOOK_EMAIL:", process.env.OUTLOOK_EMAIL);
console.log("OUTLOOK_PASSWORD:", process.env.OUTLOOK_PASSWORD);

const morgan = require("morgan");
const path = require("path");

// rest of your code

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

const router = require("express").Router();
module.exports = router;

router.use("/products", require("./products"));
router.use("/contact", require("./contact"));
router.use("/upload", require("./upload"));
router.use("/mails", require("./mails"));

require("dotenv").config();

const morgan = require("morgan");
const path = require("path");

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

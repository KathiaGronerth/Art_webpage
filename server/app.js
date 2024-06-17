const path = require("path");
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
module.exports = app;

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/arts", express.static(path.join(__dirname, "..", "public", "arts")));

// auth and api routes
app.use("/api/auth", require("./api/auth")); // Add auth routes
app.use("/api", require("./api"));

// sends index.html for any remaining requests (non-API routes)
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

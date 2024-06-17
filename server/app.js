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

// auth and api routes
app.use("/api/auth", require("./api/auth")); // Add auth routes
app.use("/api", require("./api"));

// static file-serving middleware for the React app
app.use(express.static(path.join(__dirname, "..", "dist")));

// Serve subcategory folders statically (if needed)
app.use(
  "/arts/airplanes",
  express.static(path.join(__dirname, "..", "dist", "arts", "airplanes"))
);
app.use(
  "/arts/faces",
  express.static(path.join(__dirname, "..", "dist", "arts", "faces"))
);
app.use(
  "/arts/outdoors",
  express.static(path.join(__dirname, "..", "dist", "arts", "outdoors"))
);

// sends index.html for any remaining requests (non-API routes)
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
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

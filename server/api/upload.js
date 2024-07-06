const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer for dynamic directory handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subcategory = req.body.subcategory;
    console.log("Received subcategory:", subcategory); // Log received subcategory
    if (!subcategory) {
      return cb(new Error("Subcategory is required"));
    }

    let subcategoryPath;
    switch (subcategory.toLowerCase()) {
      case "vehicles":
        subcategoryPath = "vehicles";
        break;
      case "faces":
        subcategoryPath = "faces";
        break;
      case "outdoors":
        subcategoryPath = "outdoors";
        break;
      default:
        return cb(new Error("Invalid subcategory"));
    }

    const uploadDir = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "arts",
      subcategoryPath
    );

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Define the upload route
router.post("/", upload.single("file"), (req, res) => {
  console.log("Request body:", req.body); // Log request body
  if (req.file) {
    const subcategory = req.body.subcategory.toLowerCase();
    let subcategoryPath;
    switch (subcategory) {
      case "vehicles":
        subcategoryPath = "vehicles";
        break;
      case "faces":
        subcategoryPath = "faces";
        break;
      case "outdoors":
        subcategoryPath = "outdoors";
        break;
      default:
        return res.status(400).send("Invalid subcategory");
    }

    res
      .status(200)
      .json({ url: `/arts/${subcategoryPath}/${req.file.filename}` });
  } else {
    res.status(400).send("No file uploaded");
  }
});

// Add error handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message || "Internal server error.");
});

module.exports = router;

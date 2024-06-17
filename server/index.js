require("dotenv").config(); // Load environment variables from .env file
const { db } = require("./db/models");
const PORT = process.env.PORT || 4000;
const app = require("./app");
const seed = require("../script/seed"); // Ensure the correct path to seed.js

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    }
    await db.sync();
    // Start listening on the specified port
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (ex) {
    console.error(ex);
    process.exit(1); // Exit the process with a failure code
  }
};

init();

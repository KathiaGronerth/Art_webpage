const { db } = require("./db/models");
const PORT = process.env.PORT || 3000;
const app = require("./app");
const seed = require("../script/seed"); // Ensure the correct path to seed.js

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    }
    await db.sync();
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();

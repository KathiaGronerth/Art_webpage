const Sequelize = require("sequelize");
const db = require("../db");

const Emailsetting = db.define("emailsetting", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Emailsetting;

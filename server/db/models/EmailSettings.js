const Sequelize = require("sequelize");
const db = require("../db");

const EmailSettings = db.define("emailSettings", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = EmailSettings;

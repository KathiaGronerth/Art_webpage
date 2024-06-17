const Sequelize = require("sequelize");
const db = require("../db");

const Mail = db.define("mail", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Mail;

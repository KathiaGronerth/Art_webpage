const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false, // Default to regular user
  },
});

module.exports = User;

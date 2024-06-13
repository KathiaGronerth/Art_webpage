const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  technique: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "A nice piece of product",
  },
  subcategory: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Airplanes",
  },
  imageUrl: { type: Sequelize.STRING, defaultValue: "jpg" },
});

module.exports = Product;

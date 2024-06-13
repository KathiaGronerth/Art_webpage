const db = require("../db");
const Product = require("./Product");

const models = {
  Product,
};

module.exports = { db, models };

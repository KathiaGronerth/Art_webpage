const db = require("../db");
const Product = require("./Product");
const User = require("./User");

const models = {
  Product,
  User,
};

module.exports = { db, models };

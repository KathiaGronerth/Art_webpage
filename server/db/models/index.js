const db = require("../db");
const Product = require("./Product");
const User = require("./User");
const Mail = require("./Mail");

const models = {
  Product,
  User,
  Mail,
};

module.exports = { db, models };

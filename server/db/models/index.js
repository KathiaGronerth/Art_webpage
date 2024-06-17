const db = require("../db");
const Product = require("./Product");
const User = require("./User");
const EmailSettings = require("./EmailSettings");

const models = {
  Product,
  User,
  EmailSettings,
};

module.exports = { db, models };

const db = require("../db");
const Product = require("./Product");
const User = require("./User");
const EmailSetting = require("./EmailSetting");

const models = {
  Product,
  User,
  EmailSetting,
};

module.exports = { db, models };

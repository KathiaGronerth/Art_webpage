const db = require("../db");
const Product = require("./Product");
const User = require("./User");
const Emailsetting = require("./Emailsetting_");

const models = {
  Product,
  User,
  Emailsetting,
};

module.exports = { db, models };

require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  },
});

module.exports = db;

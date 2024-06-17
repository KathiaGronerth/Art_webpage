require("dotenv").config();
const Sequelize = require("sequelize");

const isProduction = process.env.NODE_ENV === "production";

// Set the database URL based on the environment
const databaseUrl = isProduction
  ? process.env.DATABASE_URL
  : `postgres://localhost:5432/carlpage`;

const db = new Sequelize(databaseUrl, {
  logging: false,
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

module.exports = db;

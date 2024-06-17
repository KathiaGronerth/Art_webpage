const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/carlpage",
  {
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    },
  }
);

module.exports = db;

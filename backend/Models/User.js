// backend/Models/User.js
const pool = require("../config/db");

const createUsersTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(200) NOT NULL,
      role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'agent')),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log("users table ready");
};

module.exports = { createUsersTable };

// backend/Models/Policy.js
const pool = require("../config/db");

const createPoliciesTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS policies (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      type VARCHAR(50) NOT NULL,
      premium NUMERIC NOT NULL,
      coverage_amount NUMERIC NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log(" policies table ready");
};

module.exports = { createPoliciesTable };

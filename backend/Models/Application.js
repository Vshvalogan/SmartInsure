const pool = require("../config/db");
const createApplicationsTable = async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        policy_id INTEGER REFERENCES policies(id) ON DELETE CASCADE,
        status VARCHAR(20) DEFAULT 'pending',
        answers JSONB NOT NULL,          
        submitted_at TIMESTAMP DEFAULT NOW(),
        decided_at TIMESTAMP,
        decided_by INTEGER REFERENCES users(id),
        decision_notes TEXT
      );
    `);
  
    console.log("applications table ready");
  };

  module.exports = { createApplicationsTable };
// backend/Controllers/ApplicationController.js
const pool = require("../config/db");

// CREATE application
const createApplication = async (req, res) => {
  try {
    console.log("createApplication body:", req.body);

    const { user_id, policy_id, answers } = req.body;

    if (!user_id || !policy_id || !answers) {
      return res.status(400).json({ msg: "user_id, policy_id and answers are required" });
    }

    const result = await pool.query(
      `INSERT INTO applications (user_id, policy_id, answers)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, policy_id, answers] 
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("createApplication error:", error);
    return res.status(500).json({ error: error.message });
  }
};



// GET /api/applications  (optionally with ?search=...)
const getAllApplications = async (req, res) => {
  try {
    const search = req.query.search || "";

    if (!search) {
      const result = await pool.query(
        "SELECT * FROM applications ORDER BY id DESC"
      );
      return res.json(result.rows);
    }

    const term = `%${search}%`;

    const result = await pool.query(
      `
      SELECT *
      FROM applications
      WHERE 
        CAST(id AS TEXT) ILIKE $1
        OR CAST(user_id AS TEXT) ILIKE $1
        OR CAST(policy_id AS TEXT) ILIKE $1
        OR status ILIKE $1
      ORDER BY id DESC
      `,
      [term]
    );

    return res.json(result.rows);
  } catch (error) {
    console.error("getAllApplications error:", error);
    res.status(500).json({ error: error.message });
  }
};

// READ one application
const getApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM applications WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Application not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("getApplicationById error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// UPDATE application
const updateApplication = async (req, res) => {
  const { id } = req.params;
  const {
    status,
    answers,
    decided_at,
    decided_by,
    decision_notes,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE applications SET
         status = COALESCE($1, status),
         answers = COALESCE($2, answers),
         decided_at = COALESCE($3, decided_at),
         decided_by = COALESCE($4, decided_by),
         decision_notes = COALESCE($5, decision_notes)
       WHERE id = $6
       RETURNING *`,
      [status, answers, decided_at, decided_by, decision_notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Application not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("updateApplication error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// DELETE application
const deleteApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM applications WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: "Application not found" });
    }

    return res.status(200).json({ msg: "Application deleted" });
  } catch (error) {
    console.error("deleteApplication error:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};

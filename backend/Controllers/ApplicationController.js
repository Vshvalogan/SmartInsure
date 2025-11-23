// backend/Controllers/ApplicationController.js
const pool = require("../config/db");

//CREATE Application
const createApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    const { policy_id, answers } = req.body;

    if (!policy_id || !answers) {
      return res.status(400).json({
        msg: "policy_id and answers are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO applications (user_id, policy_id, answers, status)
       VALUES ($1, $2, $3, 'pending')
       RETURNING *`,
      [userId, policy_id, answers]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("createApplication error:", error);
    res.status(500).json({ error: error.message });
  }
};

//GET Application

const getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM applications WHERE user_id = $1 ORDER BY id DESC",
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("getMyApplications error:", error);
    res.status(500).json({ error: error.message });
  }
};

//GET All Application

const getAllApplications = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM applications ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("getAllApplications error:", error);
    res.status(500).json({ error: error.message });
  }
};

// GET Application by Id
const getApplicationById = async (req, res) => {
  const appId = req.params.id;

  try {
    const result = await pool.query(
      "SELECT * FROM applications WHERE id = $1",
      [appId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Application not found" });
    }

    const app = result.rows[0];

    if (req.user.role === "user" && req.user.id !== app.user_id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    res.json(app);
  } catch (error) {
    console.error("getApplicationById error:", error);
    res.status(500).json({ error: error.message });
  }
};

//UPDATE Application

const updateApplication = async (req, res) => {
  const appId = req.params.id;
  const { status, decision_notes } = req.body;

  try {
    const result = await pool.query(
      `UPDATE applications SET
         status = COALESCE($1, status),
         decision_notes = COALESCE($2, decision_notes),
         decided_by = $3,
         decided_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [status, decision_notes, req.user.id, appId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Application not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("updateApplication error:", error);
    res.status(500).json({ error: error.message });
  }
};

//DELETE Application

const deleteApplication = async (req, res) => {
  const appId = req.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM applications WHERE id = $1",
      [appId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: "Application not found" });
    }

    res.json({ msg: "Application deleted" });
  } catch (error) {
    console.error("deleteApplication error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createApplication,
  getMyApplications,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};

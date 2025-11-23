// backend/Controllers/ApplicationController.js
const pool = require("../config/db");

// CREATE application
const createApplication = async (req, res) => {
  try {
    console.log("createApplication body:", req.body);

    const userId = req.user.id;          
    const { policy_id, answers, premium } = req.body;

    if (!policy_id || !answers || premium == null) {
      return res.status(400).json({
        msg: "policy_id, answers and premium are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO applications (user_id, policy_id, answers, premium)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, policy_id, answers, premium]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("createApplication error:", error);
    return res.status(500).json({ error: error.message });
  }
};


//GET Application

const getMyApplications = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const result = await pool.query(
        `
        SELECT 
          a.*,
          p.name AS policy_name
        FROM applications a
        JOIN policies p
          ON a.policy_id = p.id
        WHERE a.user_id = $1
        ORDER BY a.id DESC
        `,
        [userId]
      );
  
      return res.json(result.rows);
    } catch (error) {
      console.error("getMyApplications error:", error);
      return res.status(500).json({ error: error.message });
    }
  };

//GET All Application

const getAllApplications = async (req, res) => {
  try {
    const search = req.query.search || "";
    const sort = req.query.sort || "id"; 
    let orderBy = "a.id DESC";
    if (sort === "user") {
      orderBy = "u.name ASC NULLS LAST, a.id DESC";
    } else if (sort === "policy") {
      orderBy = "p.name ASC NULLS LAST, a.id DESC";
    } else if (sort === "status") {
      orderBy = "a.status ASC, a.id DESC";
    }

    const params = [];
    let whereClause = "";

    if (search) {
      const term = `%${search}%`;
      params.push(term);

      whereClause = `
        WHERE 
          CAST(a.id AS TEXT) ILIKE $1
          OR CAST(a.user_id AS TEXT) ILIKE $1
          OR CAST(a.policy_id AS TEXT) ILIKE $1
          OR a.status ILIKE $1
          OR u.name ILIKE $1
          OR p.name ILIKE $1
      `;
    }

    const sql = `
      SELECT
        a.*,
        u.name AS user_name,
        p.name AS policy_name
      FROM applications a
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN policies p ON a.policy_id = p.id
      ${whereClause}
      ORDER BY ${orderBy}
    `;

    const result = await pool.query(sql, params);
    return res.json(result.rows);
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

// backend/Controllers/PolicyController.js
const pool = require("../config/db");

// CREATE policy
const createPolicy = async (req, res) => {
  const { name, type, premium, coverage_amount, description } = req.body;

  if (!name || !type || premium == null || coverage_amount == null) {
    return res
      .status(400)
      .json({ msg: "name, type, premium, coverage_amount are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO policies (name, type, premium, coverage_amount, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, type, premium, coverage_amount, description || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("createPolicy error:", error);
    res.status(500).json({ error: error.message });
  }
};

// READ all
const getAllPolicies = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM policies ORDER BY id");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("getAllPolicies error:", error);
    res.status(500).json({ error: error.message });
  }
};

// READ one
const getPolicyById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM policies WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Policy not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("getPolicyById error:", error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
const updatePolicy = async (req, res) => {
  const { id } = req.params;
  const { name, type, premium, coverage_amount, description } = req.body;

  try {
    const result = await pool.query(
      `UPDATE policies
       SET name = $1,
           type = $2,
           premium = $3,
           coverage_amount = $4,
           description = $5,
           updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [name, type, premium, coverage_amount, description || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Policy not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("updatePolicy error:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE
const deletePolicy = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM policies WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: "Policy not found" });
    }

    res.status(200).json({ msg: "Policy deleted" });
  } catch (error) {
    console.error("deletePolicy error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPolicy,
  getAllPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
};

const pool = require("../config/db");

// CREATE user
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: "name, email, password, role are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [name, email, password, role]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("createUser error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// READ all
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, created_at FROM users ORDER BY id"
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("getAllUsers error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// READ one
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT id, name, email, role, created_at FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("getUserById error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// UPDATE
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users
       SET name = $1,
           email = $2,
           password = $3,
           role = $4
       WHERE id = $5
       RETURNING id, name, email, role, created_at`,
      [name, email, password, role, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("updateUser error:", error);
    if (error.code === "23505") {
      return res.status(400).json({ msg: "Email already exists" });
    }
    return res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    console.error("deleteUser error:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

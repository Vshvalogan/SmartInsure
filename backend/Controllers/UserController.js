// controllers/UserController.js
const pool = require("../config/db");

// CREATE user (customer or agent)
const createUserController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [name, email, password, role]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

// READ – all users
const getAllUsersController = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, created_at FROM users ORDER BY id"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

// READ – single user
const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT id, name, email, role, created_at FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

// UPDATE user
const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

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

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      return res.status(400).json({ msg: "Email already exists" });
    }
    res.status(500).json({ error });
  }
};

// DELETE user
const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
};

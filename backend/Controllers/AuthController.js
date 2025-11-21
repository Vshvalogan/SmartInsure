// backend/Controllers/AuthController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ;


const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "name, email, password, role are required" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [name, email, hashedPassword, role]
    );

    return res.status(201).json({
      msg: "User registered",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("registerUser error:", error);
    return res.status(500).json({ error: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "email and password are required" });
    }

    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const user = result.rows[0];

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("loginUser error:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };

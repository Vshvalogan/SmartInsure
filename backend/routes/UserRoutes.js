// backend/routes/UserRoutes.js
const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../Controllers/UserController");

const { auth, requireRole } = require("../Middleware/AuthMiddleware");


router.post("/", auth, requireRole("agent"), createUser);
router.get("/", auth, requireRole("agent"), getAllUsers);
router.get("/:id", auth, requireRole("agent"), getUserById);
router.put("/:id", auth, requireRole("agent"), updateUser);
router.delete("/:id", auth, requireRole("agent"), deleteUser);

module.exports = router;

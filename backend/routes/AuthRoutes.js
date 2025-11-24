// backend/routes/AuthRoutes.js
const express = require("express");
const router = express.Router();

const { registerUser, loginUser , changePassword} = require("../Controllers/AuthController");
const { auth } = require("../Middleware/AuthMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-password", auth, changePassword);

module.exports = router;

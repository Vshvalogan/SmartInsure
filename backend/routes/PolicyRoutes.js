// backend/routes/PolicyRoutes.js
const express = require("express");
const router = express.Router();

const {
  createPolicy,
  getAllPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
} = require("../Controllers/PolicyController");

const { auth, requireRole } = require("../Middleware/AuthMiddleware");


router.get("/", getAllPolicies);      
router.get("/:id", getPolicyById);
router.post("/", auth, requireRole("agent"), createPolicy);
router.put("/:id", auth, requireRole("agent"), updatePolicy);
router.delete("/:id", auth, requireRole("agent"), deletePolicy);

module.exports = router;

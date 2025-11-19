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


router.get("/", getAllPolicies);      // GET /api/policies
router.post("/", createPolicy);       // POST /api/policies
router.get("/:id", getPolicyById);    // GET /api/policies/:id
router.put("/:id", updatePolicy);     // PUT /api/policies/:id
router.delete("/:id", deletePolicy);  // DELETE /api/policies/:id

module.exports = router;

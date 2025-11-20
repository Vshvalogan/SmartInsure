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


router.get("/", getAllPolicies);     
router.post("/", createPolicy);      
router.get("/:id", getPolicyById);   
router.put("/:id", updatePolicy);     
router.delete("/:id", deletePolicy);  

module.exports = router;

// backend/routes/ApplicationRoutes.js
const express = require("express");
const router = express.Router();

const {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} = require("../Controllers/ApplicationController");


router.get("/", getAllApplications);      
router.post("/", createApplication);      
router.get("/:id", getApplicationById);    
router.put("/:id", updateApplication);     
router.delete("/:id", deleteApplication);  

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  createApplication,
  getMyApplications,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} = require("../Controllers/ApplicationController");

const { auth, requireRole } = require("../Middleware/AuthMiddleware");


router.post("/", auth, requireRole("user"), createApplication);
router.get("/mine", auth, requireRole("user"), getMyApplications);
router.get("/", auth, requireRole("agent"), getAllApplications);
router.get("/:id", auth, requireRole("agent", "user"), getApplicationById);
router.put("/:id", auth, requireRole("agent"), updateApplication);
router.delete("/:id", auth, requireRole("agent", "user"), deleteApplication);

module.exports = router;

// backend/server.js
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const { createPoliciesTable } = require("./Models/Policy");
// const { createUsersTable } = require("./Models/User");
// const { createApplicationsTable } = require("./Models/Application");

const policyRoutes = require("./routes/PolicyRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SmartInsure API");
});

async function initDB() {
  try {
    await createPoliciesTable();
    // await createUsersTable();
    // await createApplicationsTable();
    console.log("DB initialized");
  } catch (err) {
    console.error(" DB init error:", err);
  }
}

// mount routes
app.use("/api/policies", policyRoutes);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});


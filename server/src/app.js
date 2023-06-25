const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("../src/api/routes/auth.routes");
const taskRoutes = require("../src/api/routes/task.routes");

require("dotenv").config();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

// Start the server
const port = process.env.PORT || 2255;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});

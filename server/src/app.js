const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("../src/api/routes/auth.routes");
const taskRoutes = require("../src/api/routes/task.routes");
const cors = require("cors");
const helmet = require('helmet');


require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());


// Routes
app.use("/api/auth", authRoutes);
// app.use(authMiddleware);
app.use("/api", taskRoutes);

// Start the server
const port = process.env.PORT || 2255;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});

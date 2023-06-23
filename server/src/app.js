const express = require("express");
const app = express();
const connectDB = require("./config/db");

require("dotenv").config();

// Middleware
app.use(express.json());

// Start the server
const port = process.env.PORT || 2255;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});

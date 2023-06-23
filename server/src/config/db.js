const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.MONGO_DB_URL;

// Connect to MongoDB
let mongoseConnect = mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

module.exports = mongoDB = () => {
  return mongoseConnect;
};

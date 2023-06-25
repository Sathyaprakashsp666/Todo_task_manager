const express = require("express");
const router = express.Router();
const {
  createTask,
  deleteTask,
  updateTask,
  getAllTasks,
} = require("../controllers/task.controller");

const authenticate = require("../middlewares/auth.middleware");

// Create a new task
router.post("/tasks", createTask);

// Retrieve all tasks
router.get("/tasks", getAllTasks);

// Update a task
router.put("/tasks/:id", updateTask);

// Delete a task
router.delete("/tasks/:id", deleteTask);

module.exports = router;

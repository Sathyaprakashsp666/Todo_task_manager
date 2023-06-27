const express = require("express");
const router = express.Router();
const {
  createTask,
  deleteTask,
  updateTask,
  getAllTasks,
  toggleStatus,
  getAllTasksBySearch,
} = require("../controllers/task.controller");

const authenticate = require("../middlewares/auth.middleware");

// Create a new task
router.post("/tasks", authenticate, createTask);

// Retrieve all tasks
router.get("/tasks", authenticate, getAllTasks);

// Update a task
router.put("/tasks/:id", authenticate, updateTask);

// Delete a task
router.delete("/tasks/:id", authenticate, deleteTask);

//Toggle status
router.patch("/tasks/toggle-status/:id", toggleStatus);

module.exports = router;

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Populating the createdBy and assignedTo
taskSchema.pre("findOne", function (next) {
  this.populate("createdBy", "username");
  this.populate("assignedTo", "username");
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

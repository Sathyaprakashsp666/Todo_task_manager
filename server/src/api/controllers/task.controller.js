const Task = require("../../models/task.model");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate, createdBy } = req.body;

    // if (!description) {
    //   res.status(500).json({ error: "description needed" });
    //   return
    // }
    console.log(req.body);

    const newTask = new Task({
      title,
      description,
      assignedTo,
      dueDate,
      // createdBy: req.user,
      createdBy,
    });

    await newTask.save();

    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // // Check if the task is created by the user or assigned to the user
    // if (
    //   task.createdBy.toString() !== req.user &&
    //   task.assignedTo.toString() !== req.user
    // ) {
    //   return res.status(403).json({ error: "Unauthorized" });
    // }

    task.title = title;
    task.description = description;
    task.assignedTo = assignedTo;
    task.dueDate = dueDate;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    // console.log(taskId);

    const task = await Task.findById(taskId);
    // console.log(task);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    // Retrieve all tasks from the database
    const tasks = await Task.find()
      .populate("createdBy", "username")
      .populate("assignedTo", "username");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

// Update status
exports.toggleStatus = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);
    console.log(task);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.completed = !task.completed;

    const updatedTask = await task.save();

    res.json(updatedTask);

    res.json({ message: "status updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update status " });
  }
};



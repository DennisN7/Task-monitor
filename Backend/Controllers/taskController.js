const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res) => {
  const { title } = req.body;

  const task = new Task({
    title,
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = async (req, res) => {
  const { status, progress } = req.body;

  const task = await Task.findById(req.params.id);

  if (task) {
    task.status = status || task.status;
    task.progress = progress || task.progress;
    task.completed = task.progress === 100;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    await task.remove();
    res.json({ message: 'Task removed' });
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

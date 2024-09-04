const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['not started', 'in progress', 'completed'],
    default: 'not started',
  },
  progress: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

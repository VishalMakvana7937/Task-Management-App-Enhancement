const mongoose = require('mongoose');

// Define schema only if model does not exist
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  assignee: { type: String }, // Assignee user ID or token
});

// Check if the model already exists before compiling it
module.exports = mongoose.models.Task || mongoose.model('Task', TaskSchema);

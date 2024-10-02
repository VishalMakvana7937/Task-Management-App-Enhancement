const mongoose = require('mongoose');

// Define Task Schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    createdAt: { type: Date, default: Date.now },
});

// Create Task Model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

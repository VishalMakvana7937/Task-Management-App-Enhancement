// controllers/massagecontroller.js
const Task = require('../models/massagemodl');
const admin = require('../firebase'); // Import Firebase Admin SDK

// Create Task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, assignee } = req.body;
  
  try {
    const task = new Task({ title, description, dueDate, assignee });
    await task.save();
    
    // Send notification for task assignment
    if (assignee) {
      sendNotification(assignee, {
        title: 'New Task Assigned',
        body: `You have been assigned the task: ${task.title}`
      });
    }

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Send Firebase Push Notification
exports.sendNotification = (token, notification) => {
  const message = {
    notification,
    token, // The device token for the user (assignee)
  };

  admin.messaging().send(message)
    .then(response => {
      console.log('Successfully sent message:', response);
    })
    .catch(error => {
      console.log('Error sending message:', error);
    });
};

// Update Task (mark as complete)
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { completed: true }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks', error });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task', error });
  }
};

const bloglist = require("../models/models");

const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;

        if (!title || !description || !dueDate || !priority) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newTask = new bloglist({ title, description, dueDate, priority });
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await bloglist.find(); // Fetch all tasks
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await bloglist.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task', error });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await bloglist.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error });
    }
};

const apply = async (req, res) => {
    try {
        res.status(200).json({ message: "Welcome to Home" });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { apply, createTask, getTasks, updateTask, deleteTask };
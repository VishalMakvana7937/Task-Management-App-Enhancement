import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Sidenav from '../Sidenav';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';

const Viewtask = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks');
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          setMessage('Failed to fetch tasks');
        }
      } catch (error) {
        setMessage('An error occurred while fetching tasks.');
        console.error('Error:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setEditDialogOpen(true);
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskId));
        setMessage('Task deleted successfully');
      } else {
        setMessage('Failed to delete task');
      }
    } catch (error) {
      setMessage('An error occurred while deleting the task.');
      console.error('Error:', error);
    }
  };

  const handleUpdate = async () => {
    if (!currentTask) return;

    const updatedTask = {
      title,
      description,
      dueDate,
      priority,
    };

    try {
      const response = await fetch(`http://localhost:5000/tasks/${currentTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(tasks.map((task) => (task._id === data._id ? data : task)));
        setMessage('Task updated successfully');
        setEditDialogOpen(false);
      } else {
        setMessage('Failed to update task');
      }
    } catch (error) {
      setMessage('An error occurred while updating the task.');
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          View Tasks
        </Typography>
        {message && (
          <Typography variant="body1" color={message.includes('success') ? 'success.main' : 'error.main'}>
            {message}
          </Typography>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {tasks.map((task) => (
            <Card key={task._id} sx={{ minWidth: 275, mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {task.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Due Date: {new Date(task.dueDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  {task.description}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button variant="outlined" onClick={() => handleEditClick(task)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(task._id)}>
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Title"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Due Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              variant="outlined"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Priority"
              fullWidth
              select
              variant="outlined"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {['low', 'medium', 'high'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Viewtask;

import React, { useState } from 'react';
import Sidenav from './Sidenav';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Typography, FormControl, InputLabel, Select, OutlinedInput } from '@mui/material';

const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

const Addtask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const task = {
      title: taskName,
      description,
      dueDate,
      priority
    };

    try {
      const response = await fetch('http://localhost:5000/addtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Task added successfully');
        console.log('Task added:', data);
        // Reset form after submission
        setTaskName('');
        setDescription('');
        setDueDate('');
        setPriority('medium');
      } else {
        setMessage('Failed to add task');
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while adding the task.');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          + Add Task
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit}>
          <TextField
            label="Task Name"
            variant="outlined"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <FormControl>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              input={<OutlinedInput label="Priority" />}
            >
              {priorities.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Add Task
          </Button>
        </Box>
        {message && (
          <Typography variant="body1" color={message.includes('success') ? 'success.main' : 'error.main'}>
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Addtask;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from './firebaseConfig';  // Assuming firebaseConfig is set up

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };
    fetchToken();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await axios.get('http://localhost:5000/tasks');
    setTasks(data);
  };

  const createTask = async () => {
    await axios.post('http://localhost:5000/addtask', {
      title,
      description,
      assignee: token // Pass the device token as the assignee
    });
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const completeTask = async (id) => {
    await axios.put(`http://localhost:5000/task/${id}/complete`);
    fetchTasks();
  };

  return (
    <div>
      <h1>Task Management App</h1>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />
        <button onClick={createTask}>Create Task</button>
      </div>

      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => completeTask(task._id)} disabled={task.completed}>
              {task.completed ? 'Completed' : 'Complete Task'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

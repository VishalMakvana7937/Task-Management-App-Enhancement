// src/App.js
import React from 'react';
import Home from './component/pages/Pages/Home'
import { Route, Routes } from 'react-router'
import Addtask from './component/pages/addtask'
import Viewtask from './component/pages/Pages/Viewtask'
import Login from './component/pages/Pages/Login.js'
import Register from './component/pages/Pages/Register.jsx'
import Task from './mesaages/task.jsx';
// import PrivateRoute from './component/pages/PrivateRoute.jsx'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private Routes */}
      {/* <Route element={<PrivateRoute requiredRole="user" />}> */}
        <Route path="/" element={<Home />} />
        <Route path="/addtask" element={<Addtask />} />
        <Route path="/viewtask" element={<Viewtask />} />
        <Route path="/task" element={<Task />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;

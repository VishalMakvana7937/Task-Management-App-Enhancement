const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

// Define routes
router.get('/', controllers.apply);
router.post('/addtask', controllers.createTask);
router.get('/tasks', controllers.getTasks);
router.put('/tasks/:id', controllers.updateTask);
router.delete('/tasks/:id', controllers.deleteTask);

const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/check-auth', authController.checkAuth);

const massageController = require('../controllers/massagecontroller');

router.post('/addtask', massageController.createTask);          // Create task
router.get('/tasks', massageController.getTasks);               // Get all tasks
router.put('/task/:id/complete', massageController.updateTask);  // Mark task as complete
router.delete('/tasks/:id', massageController.deleteTask); 


module.exports = router;

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register new user
const register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

const checkAuth = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token

  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await User.findById(decoded.userId); // Fetch user data

    if (!user) {
      return res.status(401).json({ isAuthenticated: false });
    }

    res.status(200).json({
      isAuthenticated: true,
      role: user.role, // Assume user has a 'role' field
    });
  } catch (err) {
    res.status(401).json({ isAuthenticated: false });
  }
};

module.exports = {
  register,
  login,
  checkAuth
};

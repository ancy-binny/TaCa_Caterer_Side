// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const Caterer = require('../models/caterers');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode the token and get the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID and attach it to the request object
      req.user = await Caterer.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };

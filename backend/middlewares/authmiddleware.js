const User = require('../models/usermodel');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.userVerification = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ status: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ status: false, message: 'Token verification failed' });
      } else {
        try {
          const user = await User.findById(data.id);
          if (user) {
            req.user = user; // Attach user object to the request for further use
            next(); // Continue to the next middleware or route handler
          } else {
            return res.status(404).json({ status: false, message: 'User not found' });
          }
        } catch (error) {
          console.error('User retrieval error:', error);
          return res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
};

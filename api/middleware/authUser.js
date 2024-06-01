'use strict';
const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');

const authUser = async (req, res, next) => {
  // Extract credentials from the Authorization header
  const credentials = auth(req);

  if (!credentials) {
    console.warn('Authorization header or username not found');
    return res.status(401).json({ message: 'Authorization header or username not found' });
  }

  console.log('Received credentials:', credentials);

  try {
    // Find user by email address
    const user = await User.findOne({ where: { emailAddress: credentials.name } });

    if (!user) {
      console.warn('User not found');
      return res.status(401).json({ message: 'User not found' });
    }

    // Compare provided password with stored hash
    const authenticated = bcryptjs.compareSync(credentials.pass, user.password);

    if (!authenticated) {
      console.warn(`Authentication failure for ${user.emailAddress}`);
      return res.status(401).json({ message: 'Authentication failure' });
    }

    console.log(`Authentication successful for username: ${user.emailAddress}`);
    
    // Attach user to the request object
    req.currentUser = user;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = authUser;

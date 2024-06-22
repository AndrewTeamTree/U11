'use strict';

const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');

// Middleware to authenticate request using basic-auth
const authUser = async (req, res, next) => {
  let message; // store message to display
  const credentials = auth(req);

  // if the user's credentials are available... check if user exists by email
  // NOTE: that credentials username and password get returned as .name and .pass
  if (credentials) {
    const user = await User.findOne({ where: { emailAddress: credentials.name } });
    if (user) { // if user is found in db
      const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
      if (authenticated) { // if passwords match
        console.log(`Authentication successful for username: ${user.emailAddress}`);
        req.currentUser = user; // store user on request object
      } else { // passwords did not match
        message = `Authentication failure for ${user.emailAddress}`;
      }
    } else {
      message = `User not found`;
    }
  } else {
    message = 'Authorization header not found';
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access denied' });
  } else {
    next();
  }
}
module.exports = authUser;
/*
'use strict';
const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const credentials = auth(req);

if (!credentials) {
    console.warn('Authorization header or username not found');
    return res.status(401).json({ message: 'Authorization header or username not found' });
  }
console.log('Received credentials:', credentials);


  const user = await User.findOne({ where: { emailAddress: credentials.name } });
  if (!user) {
    console.warn('User not found');
    return res.status(401).json({ message: 'User not found' });
  }

  const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
  if (!authenticated) {
    console.warn(`Authentication failure for ${user.emailAddress}`);
    return res.status(401).json({ message: 'Authentication failure' });
  }

  console.log(`Authentication successful for username: ${user.emailAddress}`);
  req.currentUser = user;
  next();

  if (!authHeader) {
    console.warn('Authorization header not found');
    return res.status(401).json({ message: 'Authorization header not found' });
  }

  const [type, credit] = authHeader.split(' ');

  if (type !== 'Basic' || !credit) {
    console.warn('Invalid authorization format');
    return res.status(401).json({ message: 'Invalid authorization format' });
  }

  const decodedCredit = Buffer.from(credit, 'base64').toString();
  console.log('Decoded credit:', decodedCredit);
  
  const [email, password] = decodedCredit.split(':');
  console.log('Extracted email:', email);
  console.log('Extracted password:', password);

  if (!email || !password) {
    console.warn('Email or password missing');
    return res.status(401).json({ message: 'Email or password missing' });
  }

  try {
    const user = await User.findOne({ where: { emailAddress: credentials.email } });

    if (!user) {
      console.warn('User not found');
      return res.status(401).json({ message: 'User not found' });
    }

    const authenticated = bcryptjs.compareSync(password, user.password);

    if (!authenticated) {
      console.warn(`Authentication failure for email: ${email}`);
      return res.status(401).json({ message: 'Authentication failure' });
    }

    console.log(`Authentication successful for email: ${email}`);
    req.currentUser = user;
    next();
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = authUser;

*/
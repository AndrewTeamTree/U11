'use strict';
const authUser = require('../middleware/authUser');
const { check, validationResult } = require('express-validator');
const { User } = require('../models');
const express = require('express');
const router = express.Router();
const nameRegex = /^[a-zA-Z-]+(?:[\s-][a-zA-Z-]+)*$/;

// GET /api/users route
router.get('/users', authUser, async (req, res) => {
  try {
    const authenticatedUser = req.user; 
    if (authenticatedUser) {
      const foundUser = await User.findOne({ 
        where: { id: authenticatedUser.id }, 
        attributes: ['id', 'firstName', 'lastName', 'emailAddress'] 
      });

      if (foundUser) {
        res.status(200).json(foundUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      res.status(400).json({ message: 'Authentication required' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/users - Create a new user
router.post('/users', [
  check('firstName')
    .isLength({ min: 2 })
    .matches(nameRegex)
    .withMessage('First name is required. Please use only alphabetic characters and hyphens.'),
  check('lastName')
    .isLength({ min: 2 })
    .matches(nameRegex)
    .withMessage('Last name is required. Please use only alphabetic characters and hyphens.'),
  check('emailAddress')
    .isEmail()
    .withMessage('Invalid email format'),
  check('password')
    .isPassword()
    
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
     await User.create(req.body);
    res.status(201).location('/').end();
  } catch (error) {
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

module.exports = router;

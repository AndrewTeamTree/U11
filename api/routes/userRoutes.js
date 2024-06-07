'use strict';
const authUser = require('../middleware/authUser');
const { check, validationResult } = require('express-validator');
const { User } = require('../models');

const express = require('express');
const router = express.Router();

// GET /api/users route
router.get('/users', authUser, async (req, res) => {
  const user = req.currentUser;
  res.status(200).json({ user });
});

/* CREATE a new user */
router.post('/users', [
  check('firstName').isLength({ min: 1 }).withMessage('First name is required'),
  check('lastName').isLength({ min: 1 }).withMessage('Last name is required'),
  check('emailAddress').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    console.log('Payload being processed:', req.body);
    await User.create(req.body);
    res.status(201).location('/').end();
  } catch (error) {
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
      const errors = error.errors.map(err => err.message);
      console.log('Sequelize validation errors:', errors);
      res.status(400).json({ errors });
    } else {
      throw (error);
    }
  }
});

module.exports = router;

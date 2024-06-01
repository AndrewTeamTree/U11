'use strict';
const express = require('express');
const { check, validationResult } = require('express-validator');
const { User } = require('../models');
const authUser = require('../middleware/authUser');

const router = express.Router();
const nameRegex = /^[a-zA-Z-]+(?:[\s-][a-zA-Z-]+)*$/;

// GET /api/users route
router.get('/users', authUser, async (req, res) => {
  const user = req.currentUser;
  res.status(200).json({ user });
});

// Validation rules
const userValidationRules = [
  check('name')
    .matches(nameRegex)
    .withMessage('Please enter a valid first name only containing letters and hyphens.'),
  check('username')
    .isAlphanumeric()
    .withMessage('Please enter a valid username containing only letters and numbers.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.')
];

/* CREATE a new user */
router.post('/users', userValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(err => err.msg) });
  }

  try {
    const user = await User.create(req.body);
    res.status(201).location('/').end();
  } catch (error) {
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
      const sequelizeErrors = error.errors.map(err => err.message);
      res.status(400).json({ errors: sequelizeErrors });
    } else {
      throw error;
    }
  }
});

module.exports = router;

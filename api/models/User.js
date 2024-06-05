
'use strict';
const { Model, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'A first name is required.' },
        notEmpty: { msg: 'Please provide a first name.' },
        is: {
          args: /^[a-zA-Z-]+$/,
          msg: 'First name should only contain letters and hyphens.',
        }
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'A last name is required.' },
        notEmpty: { msg: 'Please provide a last name.' },
        is: {
          args: /^[a-zA-Z-]+$/,
          msg: 'Last name should only contain letters and hyphens.',
        }
      },
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email address must be unique. This email is already registered.' },
      validate: {
        notNull: { msg: 'Please provide an email address.' },
        notEmpty: { msg: 'An email address is required.' },
        isEmail: { msg: 'Please provide a valid email address.' }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'A password is required.' },
        notEmpty: { msg: 'Please provide a password.' },
        len: {
          args: [8, 20],
          msg: 'Password must be 8-20 characters in length.',
        },
      },
      set(val) {
        if (val && !val.startsWith('$2')) {
          const hashedPassword = bcryptjs.hashSync(val, 10);
          this.setDataValue('password', hashedPassword);
        }
      }
    }
  }, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course);
  };

  return User;
};

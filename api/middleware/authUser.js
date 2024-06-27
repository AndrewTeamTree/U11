'use strict'

const auth = require('basic-auth')
const bcryptjs = require('bcryptjs')
const { User } = require('../models')

// Middleware to authenticate request using basic-auth
const authUser = async (req, res, next) => {
  let message // store message to display
  const credentials = auth(req)

  // if the user's credentials are available... check if user exists by email
  if (credentials) {
    const user = await User.findOne({ where: { emailAddress: credentials.name } })
    if (user) { // if user is found in db
      const authenticated = bcryptjs.compareSync(credentials.pass, user.password)
      if (authenticated) { // if passwords match

        req.currentUser = user // store user on request object
      } else { // passwords did not match
        message = `Authentication failure for ${user.emailAddress}`
      }
    } else {
      message = 'User not found'
    }
  } else {
    message = 'Authorization header not found'
  }

  if (message) {
    console.warn(message)
    res.status(401).json({ message: 'Access denied' })
  } else {
    next()
  }
}

module.exports = authUser

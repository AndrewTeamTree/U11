import React, { useContext, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const UserSignIn = () => {
  const navigate = useNavigate() // Provides navigation functionality
  const { actions } = useContext(AuthContext) // Retrieves signIn function from AuthContext
  const [emailError, setEmailError] = useState('') // Manages email validation error state
  const [passwordError, setPasswordError] = useState('') // Manages password validation error state
  const emailAddress = useRef(null) // Ref for email input field
  const password = useRef(null) // Ref for password input field

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault()
    const credentials = {
      username: emailAddress.current.value, // Retrieves email from input field
      password: password.current.value, // Retrieves password from input field
    }

    try {
      // Validates email format
      if (!validateEmail(credentials.username)) {
        setEmailError('Please enter a valid email address.')
        return
      }
      // Validates password length
      if (!validatePassword(credentials.password)) {
        setPasswordError('Password must be at least 8 characters long.')
        return
      }

      // Attempts to sign in using provided credentials
      const user = await actions.signIn(credentials)
      if (user) {
        navigate('/') // Redirects to home page on successful sign-in
      } else {
        setEmailError('Invalid email or password') // Sets error message for invalid credentials
      }
    } catch (error) {
      console.log('Error: ', error.message)
      setEmailError('Sign-in failed. Please try again.') // Sets error message for sign-in failure
    }
  }

  // Validates email format using regular expression
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  // Validates password length
  const validatePassword = (password) => {
    return password.length >= 8
  }

  // Renders the sign-in form
  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          ref={emailAddress}
          placeholder="email@example.com"
          onChange={() => setEmailError('')}
        />
        {emailError && <p className="error">{emailError}</p>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          ref={password}
          placeholder="8-20 characters"
          onChange={() => setPasswordError('')}
        />
        {passwordError && <p className="error">{passwordError}</p>}

        <button className="button" type="submit">
          Sign In
        </button>
      </form>
      <p>
        Don't have a user account? Click here to <Link to="/signup">sign up</Link>!
      </p>
    </div>
  )
}

export default UserSignIn

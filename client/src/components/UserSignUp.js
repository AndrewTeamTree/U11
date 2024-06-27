import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const UserSignUp = () => {
  const navigate = useNavigate()
  const { actions } = useContext(AuthContext) // Accesses actions from AuthContext
  const [error, setError] = useState('') // State to manage error messages
  const firstName = useRef(null) // Ref to capture first name input
  const lastName = useRef(null) // Ref to capture last name input
  const emailAddress = useRef(null) // Ref to capture email input
  const password = useRef(null) // Ref to capture password input

  const handleSubmit = async (event) => {
    event.preventDefault() // Prevents default form submission behavior

    // Constructing a new user object from form input
    const newUser = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    }

    try {
      // Attempt to create a new user using actions.createUser method
      const response = await actions.createUser(newUser)

      // If user creation is successful, navigate to sign-in page
      if (response) {
        console.log('User created successfully')
        navigate('/signin')
      } else {
        setError('User creation failed. Please try again.')
      }
    } catch (error) {
      // Handle errors during user creation
      console.error('Error:', error)

      // Parsing error messages and setting appropriate error state
      try {
        const errorMessage = JSON.parse(error.message.split('message: ')[1]).errors.join(', ')
        setError(`An error occurred during sign up: ${errorMessage}`)
      } catch (parseError) {
        setError('An error occurred during sign up. Please try again.')
      }
    }
  }

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" ref={firstName} placeholder="First Name" required />

        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" ref={lastName} placeholder="Last Name" required />

        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} placeholder="email@example.com" required />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" ref={password} placeholder="Password" required />

        {error && <p className="error">{error}</p>} {/* Display error message if present */}

        <button className="button" type="submit">Sign Up</button> {/* Submit button */}

      </form>
    </div>
  )
}

export default UserSignUp

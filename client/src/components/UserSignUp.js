import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../link/api'

const UserSignUp = () => {
  const navigate = useNavigate()

  const [errors, setErrors] = useState([])
  const [error, setError] = useState('')

  // Refs to capture form input values
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault() // Prevents default form submission behavior

    // Constructing a new user object from form input
    const newUser = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      emailAddress: emailRef.current.value,
      password: passwordRef.current.value,
    }

    try {
      // Attempt to create a new user
      const response = await api('/users', 'POST', newUser)

      // If user creation is successful, navigate to sign-in page
      if (response.status === 201) {
        console.log('User created successfully')
        navigate('/signin')
      } else if (response.status === 400) {
        // If validation errors are returned, set them in state
        const data = await response.json()
        setErrors(data.errors)
      } else {
        setError('User creation failed. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('An error occurred during sign up. Please try again.')
    }
  }

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" ref={firstNameRef} placeholder="First Name" required />

        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" ref={lastNameRef} placeholder="Last Name" required />

        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" ref={emailRef} placeholder="Email" required />
        {errors.emailAddress && <p className="error">{errors.emailAddress}</p>}

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" ref={passwordRef} placeholder="Password" required />
        {errors.password && <p className="error">{errors.password}</p>}

        {error && <p className="error">{error}</p>}

        <button className="button" type="submit">Sign Up</button>
      </form>
      {errors.length > 0 && (
        <div className="validation-errors">
          <h2 className="validation--errors--label">Validation errors</h2>
          <ul>
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserSignUp

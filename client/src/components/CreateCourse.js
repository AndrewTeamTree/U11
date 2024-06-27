import React, { useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import api from '../link/api'

const CreateCourse = () => {
  // Hook to navigate programmatically
  const navigate = useNavigate()
  // Getting authenticated user context
  const { authUser } = useContext(AuthContext)

  // State to manage error messages
  const [error, setError] = useState('')
  // State to manage loading status
  const [loading, setLoading] = useState(false)

  // Refs to access form inputs
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const materialsNeededRef = useRef(null)
  const estimatedTimeRef = useRef(null)

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault() // Prevents default form submission
    setLoading(true) // Sets loading state to true
    setError('') // Clears previous error messages

    // Creating new course object from form inputs
    const newCourse = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      materialsNeeded: materialsNeededRef.current.value,
      estimatedTime: estimatedTimeRef.current.value,
      userId: authUser.id,
    }

    // Authentication credentials
    const credentials = {
      username: authUser.emailAddress,
      password: authUser.password,
    }

    try {
      // API call to create a new course
      const response = await api('/courses', 'POST', newCourse, credentials)
      if (response.status === 201) {
        console.log('Course created successfully')
        navigate('/') // Navigate to home page on success
      } else {
        const errorMessage = await response.json()
        console.error('Course creation failed:', errorMessage) // Debugging line
        setError(`Course creation failed: ${errorMessage.message || 'Please try again.'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false) // Sets loading state to false
    }
  }

  // Function to handle cancel button click
  const handleCancel = (event) => {
    event.preventDefault() // Prevents default button action
    navigate('/') // Navigate to home page
  }

  // JSX to render the form and handle UI interactions
  return (
    <div className="wrap">
      <h2>Create Course</h2>
      <div className="validation--errors">
        <h3>{error}Validation errors</h3>
        <ul>
          <li>Please provide a value for "Title"</li>
          <li>Please provide a value for "Description"</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" ref={titleRef} required />
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" ref={descriptionRef} required />
        <label htmlFor="estimatedTime">Estimated Time</label>
        <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTimeRef} />
        <label htmlFor="materialsNeeded">Materials Needed</label>
        <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeededRef} />
        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Creating Course...' : 'Create Course'}
        </button>
        <button className="button button-secondary" onClick={handleCancel} disabled={loading}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default CreateCourse

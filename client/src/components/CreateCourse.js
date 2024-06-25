// CreateCourse.js
import React, { useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import api from '../link/api' // Adjust import path as needed

const CreateCourse = () => {
  const navigate = useNavigate()
  const { authUser } = useContext(AuthContext)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const materialsNeededRef = useRef(null)
  const estimatedTimeRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const newCourse = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      materialsNeeded: materialsNeededRef.current.value,
      estimatedTime: estimatedTimeRef.current.value,
      userId: authUser.id,
    }

    const credentials = {
      username: authUser.emailAddress,
      password: authUser.password,
    }

    console.log('Submitting new course:', newCourse) // Debugging line
    console.log('With credentials:', credentials) // Debugging line

    try {
      const response = await api('/courses', 'POST', newCourse, credentials)
      if (response.status === 201) {
        console.log('Course created successfully')
        navigate('/')
      } else {
        const errorMessage = await response.json()
        console.error('Course creation failed:', errorMessage) // Debugging line
        setError(`Course creation failed: ${errorMessage.message || 'Please try again.'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = (event) => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <div className="form--centered">
      <h2>Create Course</h2>
      {error && (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <p>{error}</p>
          </div>
        </div>
      )}
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

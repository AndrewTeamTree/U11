import React, { useContext, useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../link/api'
import AuthContext from '../context/AuthContext'

const UpdateCourse = () => {
  const { authUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const { id } = useParams()

  const [course, setCourse] = useState(null)
  const [errors, setErrors] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const estimatedTimeRef = useRef(null)
  const materialsNeededRef = useRef(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api(`/courses/${id}`, 'GET')
        if (response.status === 200) {
          const data = await response.json()
          setCourse(data)
        } else if (response.status === 404) {
          navigate('/notfound')
        }
      } catch (error) {
        setErrors(['Failed to fetch course.'])
      }
    }

    fetchCourse()
  }, [id, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    const updatedCourse = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      estimatedTime: estimatedTimeRef.current.value,
      materialsNeeded: materialsNeededRef.current.value,
      userId: authUser.user.id,
    }

    const credentials = {
      username: authUser.emailAddress,
      password: authUser.password,
    }

    try {
      const response = await api(`/courses/${id}`, 'PUT', updatedCourse, credentials)

      if (response.status === 204) {
        console.log('Course updated successfully')
        navigate(`/courses/${id}`)
      } else {
        const errorMessage = await response.json()
        console.error('Course update failed:', errorMessage)
        setErrors(errorMessage.errors || {})
        setError(`Course update failed: ${errorMessage.message || 'Please try again.'}`)
      }
    } catch (error) {
      console.error('Error updating course:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCourse = async () => {
    const credentials = {
      username: authUser.emailAddress,
      password: authUser.password,
    }

    try {
      const response = await api(`/courses/${id}`, 'DELETE', null, credentials)

      if (response.status === 204) {
        console.log('Course deleted successfully')
        navigate('/')
      } else {
        const errorMessage = await response.json()
        console.error('Course deletion failed:', errorMessage)
        setErrors(errorMessage.errors || {})
      }
    } catch (error) {
      console.error('Error deleting course:', error)
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      {error && (
        <div className="validation--errors">
          <h3>Validation errors</h3>
          <ul>
            {errors.title && <li>{errors.title}</li>}
            {errors.description && <li>{errors.description}</li>}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            {errors.title && <p className="error">{errors.title}</p>}
            <label htmlFor="title">Course Title</label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={course?.title || ''}
              ref={titleRef}
            />
            <p>By {course?.User && `${course.User.firstName} ${course.User.lastName}`}</p>
            {errors.description && <p className="error">{errors.description}</p>}
            <label htmlFor="description">Course Description</label>
            <textarea
              id="description"
              name="description"
              defaultValue={course?.description || ''}
              ref={descriptionRef}
              style={{ resize: 'none' }}
            />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              defaultValue={course?.estimatedTime || ''}
              ref={estimatedTimeRef}
            />
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              defaultValue={course?.materialsNeeded || ''}
              ref={materialsNeededRef}
              style={{ resize: 'none' }}
            />
          </div>
        </div>
        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Updating Course...' : 'Update Course'}
        </button>
        <button type="button" className="button button-secondary" onClick={() => navigate(`/courses/${id}`)}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default UpdateCourse

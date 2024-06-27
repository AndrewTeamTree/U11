import React, { useContext, useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../link/api'
import AuthContext from '../context/AuthContext'

const UpdateCourse = () => {
  const { authUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const { id } = useParams()

  const [course, setCourse] = useState(null) // State to hold the course data
  const [errors, setErrors] = useState([]) // State to manage validation errors

  // Refs to hold form input references
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const estimatedTimeRef = useRef(null)
  const materialsNeededRef = useRef(null)

  // Effect to fetch course data on component mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api(`/courses/${id}`, 'GET', null, null)
        if (response.status === 200) {
          const data = await response.json()
          setCourse(data)
        } else if (response.status === 404) {
          navigate('/notfound') // Redirects to not found page if course is not found
        }
      } catch (error) {
        setErrors(['Failed to fetch course.']) // Sets error state if fetching course fails
      }
    }

    fetchCourse()
  }, [id, navigate])

  // Handles form submission to update the course
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Constructs updated course object from form inputs
    const updatedCourse = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      estimatedTime: estimatedTimeRef.current.value,
      materialsNeeded: materialsNeededRef.current.value,
      userId: authUser.user.id, // Assigns the user ID from authUser context
    }

    try {
      // Sends PUT request to update the course
      const response = await api(`/courses/${id}`, 'PUT', updatedCourse, {
        username: authUser.emailAddress,
        password: authUser.password,
      })

      // Redirects to the course detail page if update is successful
      if (response.status === 204) {
        navigate(`/courses/${id}`)
      } else if (response.status === 403) {
        setErrors(['You do not have permission to update this course.']) // Sets error for permission issues
      } else {
        const message = await response.json()
        setErrors([`HTTP error! status: ${response.status}, message: ${JSON.stringify(message)}`]) // Sets error for other HTTP errors
      }
    } catch (error) {
      setErrors(['Failed to update course.']) // Sets error if update fails
    }
  }

  // Handles deletion of the course
  const handleDeleteCourse = async () => {
    const credentials = {
      username: authUser.emailAddress,
      password: authUser.password,
    }

    try {
      // Sends DELETE request to delete the course
      const response = await api(`/courses/${id}`, 'DELETE', null, credentials)

      // Redirects to the home page if deletion is successful
      if (response.status === 204) {
        navigate('/')
      } else if (response.status === 401 || response.status === 403) {
        const data = await response.json()
        setErrors([data.message]) // Sets error if user does not have permission to delete
      } else {
        throw new Error() // Throws error for unexpected status codes
      }
    } catch (error) {
      setErrors(['Failed to delete course.']) // Sets error if deletion fails
    }
  }

  // Renders loading message if course data is not yet fetched
  if (!course) {
    return <p>Loading...</p>
  }

  // Renders update course form with course data and error messages
  return (
    <div className="wrap">
      <h2>Update Course</h2>
      {errors.length > 0 && (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="title">Course Title</label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={course.title}
              ref={titleRef}
            />
            <p>By {course.User && `${course.User.firstName} ${course.User.lastName}`}</p>
            <label htmlFor="description">Course Description</label>
            <textarea
              id="description"
              name="description"
              defaultValue={course.description}
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
              defaultValue={course.estimatedTime}
              ref={estimatedTimeRef}
            />
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              defaultValue={course.materialsNeeded}
              ref={materialsNeededRef}
              style={{ resize: 'none' }}
            />
          </div>
        </div>
        <button className="button" type="submit">Update Course</button>
        <button type="button" className="button" onClick={handleDeleteCourse}>
          Delete Course
        </button>
        <button type="button" className="button button-secondary" onClick={() => navigate(`/courses/${id}`)}>Cancel</button>
      </form>
    </div>
  )
}

export default UpdateCourse

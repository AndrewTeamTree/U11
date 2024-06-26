import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import Markdown from 'react-markdown'
import { api } from '../link'

function CourseDetail() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${id}`, 'GET', null, null)
        const contentType = response.headers.get('content-type')
        if (!response.ok) {
          throw new Error('Failed to fetch course')
        }
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json()
          setCourse(data)
        } else if (response.status === 404) {
          const text = await response.text()
          throw new Error(`Unexpected response format: ${text}`)
          navigate('/notfound')
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false) // Set loading state to false regardless of success or failure
      }
    }
    fetchCourse()
  }, [id])

  if (isLoading) {
    return <p>Loading...</p> // Show a loading indicator while fetching data
  }

  if (error) {
    return <p>Error: {error}</p> // Display a user-friendly error message
  }

  if (!course) {
    return <p>Course not found</p> // Handle case where course data is null
  }

  // DELETE Course
  const handleDeleteCourse = async () => {
    const credentials = {
      username: authUser.user.emailAddress,
      password: authUser.user.password
    }
    try {
      const response = await api(`/courses/${id}`, "DELETE", null, credentials)
      if (response.status === 204) {
        navigate('/')
      } else if (response.status === 401) {
        const data = await response.json()
        setErrors([data.message])
      } else {
        throw new Error()
      }
    } catch (error) {
      console.log('Error: ', error.message)
    }
  }

  return (
    <div className="wrap">
      <h2>Course Detail</h2>
      <form>
        <div className="main--flex">
          <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{course.title}</h4>
            <p>By {course.User.firstName} {course.User.lastName}</p>
            <p>{course.description}</p>
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{course.estimatedTime}</p>
            <h3 className="course--detail--title">Materials Needed</h3>
            <ul className="course--detail--list">
              {course.materialsNeeded && course.materialsNeeded.split('\n').map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
          </div>
        </div>
      </form>
      <div className="actions--bar">
        <div className="wrap">
          <button className="button" to={`/courses/${id}/update`}>Update Course</button>
          <button className="button" onClick={handleDeleteCourse}>Delete</button>
          <button className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail

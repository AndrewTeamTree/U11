import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Markdown from 'react-markdown'
import api from '../link/api' // Adjust import path as needed

const CourseDetail = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const { authUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api(`/courses/${id}`, 'GET')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setCourse(data)
      } catch (error) {
        console.error('Error fetching course details:', error)
      }
    }

    fetchCourse()
  }, [id])

  const handleDeleteCourse = async () => {
    try {
      const credentials = {
        username: authUser.emailAddress,
        password: authUser.password,
      }

      const response = await api(`/courses/${id}`, 'DELETE', null, credentials)

      if (response.ok) {
        console.log('Course deleted successfully')
        navigate('/')
      } else {
        const errorMessage = await response.text()
        console.error('Error deleting course:', errorMessage)
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Error deleting course:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  if (!course) {
    return <p>Loading...</p>
  }

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
          <button className="button" onClick={handleDeleteCourse}>Delete</button>
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {course.User.firstName} {course.User.lastName}</p>
              <Markdown>{course.description}</Markdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <div className="course--detail--list">
                <Markdown>{course.materialsNeeded}</Markdown>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default CourseDetail

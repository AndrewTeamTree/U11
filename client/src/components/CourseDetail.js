import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Markdown from 'react-markdown'

const CourseDetail = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const { authUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${id}`)
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
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authUser.token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      navigate('/')
    } catch (error) {
      console.error('Error deleting course:', error)
    }
  }

  if (!course) {
    return <p>Loading...</p>
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
          <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
          <button className="button" onClick={handleDeleteCourse}>Delete</button>
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail

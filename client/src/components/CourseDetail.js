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
      <div>
        <h3>{course.title}</h3>
        <Markdown>{course.description}</Markdown>
        <p>Estimated Time: {course.estimatedTime}</p>
        <Markdown>{course.materialsNeeded}</Markdown>
        {authUser && authUser.id === course.userId && (
          <div>
            <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
            <button className="button" onClick={handleDeleteCourse}>Delete</button>
            <Link className="button button-secondary" to="/">Return to List</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseDetail

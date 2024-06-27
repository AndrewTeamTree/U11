import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/global.css'
import api from '../link/api'

const Courses = () => {
  // State to store courses data
  const [courses, setCourses] = useState([])
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        // Make a GET request to the API to fetch courses
        const response = await api('/courses', "GET")

        // If request is successful, update the courses state
        if (response.status === 200) {
          const data = await response.json()
          setCourses(data)
        }
      } catch (error) {
        console.log("Error: ", error)
      } finally {
        // Set loading state to false after fetching data
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Show loading message while data is being fetched
  if (isLoading) {
    return <p>Loading...</p>
  }

  // Render the list of courses and a link to create a new course
  return (
    <div className="wrap main--grid">
      {courses.map(course => (
        <Link
          to={`/courses/${course.id}`}
          className='course--module course--link'
          key={course.id}
        >
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      ))}

      <Link
        to="/courses/create"
        className="course--module course--add--module"
      >
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6"></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  )
}

export default Courses

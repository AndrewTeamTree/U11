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

  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const estimatedTimeRef = useRef(null)
  const materialsNeededRef = useRef(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api(`/courses/${id}`, 'GET', null, null)
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

    const updatedCourse = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      estimatedTime: estimatedTimeRef.current.value,
      materialsNeeded: materialsNeededRef.current.value,
      userId: authUser.user.id
    }

    try {
      const response = await api(`/courses/${id}`, 'PUT', updatedCourse, {
        username: authUser.emailAddress,
        password: authUser.password
      })

      if (response.status === 204) {
        navigate(`/courses/${id}`)
      } else {
        const message = await response.json()
        setErrors([`HTTP error! status: ${response.status}, message: ${JSON.stringify(message)}`])
      }
    } catch (error) {
      setErrors(['Failed to update course.'])
    }
  }

  if (!course) {
    return <p>Loading...</p>
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
        <button className="button" onClick={handleDeleteCourse}>
          Delete Course
        </button>
        <button className="button button-secondary" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  )
}

export default UpdateCourse


import React, { useContext, useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../link/api';
import AuthContext from '../context/AuthContext';

const UpdateCourse = () => {
   // React Hooks
   const { authUser } = useContext(AuthContext);
   const [errors] = useState([]);
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  
  const { id } = useParams();
  // React Refs
  const title = useRef(null);
  const description = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api(`/courses/id/`, "GET", null, null);
        if (response.status === 200) {
          const data = await response.json();
          if (authUser) {
           
       
            setCourse(data);
          }
        } else if (response.status === 404) {
          navigate('/notfound');
        }
      } catch (error) {
        console.log('Error: ', error.message);
      }
    };
    fetchData();
  }, [id, navigate, authUser.user.emailAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
     const updatedCourse = {
      title: title.current.value,
      description: description.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
      userId: authUser.user.id
    };
    const credentials = {
      username: authUser.user.emailAddress,
      password: authUser.user.password
    };
    try {
      const response = await api('/courses/:id/', 'PUT', updatedCourse, credentials );
      if (response.status === 200) {
        navigate(`/courses/${id}`);
      } else {
        console.error('Failed to update course');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    
    <>
      <const errors = {errors.map((error => error.msg || error))} />
      <div className="wrap">
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
    <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                ref={title}
                defaultValue={course.title}
              />
              <p>
                By {course.User && `${course.User.firstName} ${course.User.lastName}`}
              </p>
              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                ref={description}
                defaultValue={course.description}
                style={{ resize: 'none' }}
              />
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                ref={estimatedTime}
                defaultValue={course.estimatedTime}
              />
              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                ref={materialsNeeded}
                defaultValue={course.materialsNeeded}
                style={{ resize: 'none' }}
              />
            </div>
          </div>
 <button className="button" type="submit">Update Button</button>
 <button className="button button-secondary" to='/'>Cancel</button>
        </form>
      </div>
    </>
  );

}
export default UpdateCourse;



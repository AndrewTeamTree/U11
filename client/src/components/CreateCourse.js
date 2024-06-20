
import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//import api from '../link/api';
import AuthContext from "../context/AuthContext";

const CreateCourse = () => {
  const { actions } = useContext(AuthContext);
  const { authUser } = useContext(AuthContext);
  const title = useRef(null);
  const description = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCourse = {
      title: title.current.value,
      description: description.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
      
    };

    const credentials = {
      username: authUser.user.emailAddress,
      password: authUser.user.password,
    };

    try {/*
    console.log('Form data submitted:', newUser); // Log the form data
    
    try {
      const response = await actions.createUser(newUser);
      console.log('Payload being sent:', newUser); // Log the payload being sent
      if (response) {
        console.log('User created successfully');
        navigate('/signin');
      } else {
        setError( */
      const response = await actions.createCourse(newCourse, '/');
      console.log('Payload being sent:', newCourse); // Log the payload being sent
      if (credentials) {
        console.log('Course created successfully');
        navigate('/');
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      } else {
        throw new Error('Failed to create course');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="title">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              ref={title}
            />
            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              ref={description}
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
            />
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              ref={materialsNeeded}
              style={{ resize: 'none' }}
            />
          </div>
        </div>
        <button className="button" type="submit">Create Course</button>
      </form>
      {errors.length > 0 && (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CreateCourse;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function CreateCourse ()  {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);

  const createCourse = async (course) => {
    const encodedCredentials = btoa(`${authUser.email}:${authUser.password}`);
    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        },
        body: JSON.stringify(course),
        credentials: 'include'
      });
      if (response.status === 201) {
        return await response.json();
      } else {
        const message = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(message)}`);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const course = {
      title,
      description,
      materialsNeeded,
      estimatedTime,
    };

    try {
      const newCourse = await createCourse(course);
      if (newCourse) {
        navigate(`/courses/${newCourse.id}`);
      } else {
        setErrors(["Course creation failed. Please try again."]);
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  return (
    <div className="form--centered">
      <h2>Create Course</h2>
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
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="estimatedTime">Estimated Time</label>
        <input
          id="estimatedTime"
          name="estimatedTime"
          type="text"
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
        />
        <label htmlFor="materialsNeeded">Materials Needed</label>
        <textarea
          id="materialsNeeded"
          name="materialsNeeded"
          value={materialsNeeded}
          onChange={(e) => setMaterialsNeeded(e.target.value)}
        />
        <button className="button" type="submit">Create Course</button>
        <button className="button button-secondary" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateCourse;




/*
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
      userId: authUser.user.id
    };

    const credentials = {
      username: authUser.user.emailAddress,
      password: authUser.user.password,
    };

    try {
      const response = await actions.createCourse('/courses/:id/', 'POST');
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
            <label for="title">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              ref={title}
            />
            <label for="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              ref={description}
              style={{ resize: 'none' }}
            />
          </div>
          <div>
            <label for="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              ref={estimatedTime}
            />
            <label for="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              ref={materialsNeeded}
              style={{ resize: 'none' }}
            />
          </div>
        </div>
        <button className="button" type="submit">Create Course</button>
        <button className="button button-secondary" to='/'>Cancel</button>
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
*/
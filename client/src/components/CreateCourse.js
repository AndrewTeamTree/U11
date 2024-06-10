import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  AuthProvider } from '../context/AuthContext';

const CreateCourse = () => {
  const { actions } = (AuthProvider);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const api = async (path, method = 'GET', body = null) => {
    const url = `http://localhost:5000/api/courses${path}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    };
    const response = await fetch(url, options);
    return response;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const course = { title, description, estimatedTime, materialsNeeded };
    try {
      const response = await api('', 'POST', course);
      if (response.status === 201) {
        navigate('/');
        const createdCourse = await actions.createCourse(course);
      if (createdCourse) {
        navigate('/');
      }
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      } 
    } catch (error) {
      console.error(error);
      navigate('/error');
    }
  };


  return (
    <div className="wrap">
      <h2>Create Course</h2>
      {errors.length > 0 && (
        <div>
          <h2>Validation Errors</h2>
          <ul>
            {errors.map((error, index) => <li key={index}>{error}</li>)}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
        
          <label htmlFor="title">Title</label>
          <input 
            id="title" 
            name="title" 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="estimatedTime">Estimated Time</label>
          <input 
            id="estimatedTime" 
            name="estimatedTime" 
            type="text" 
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="materialsNeeded">Materials Needed</label>
          <textarea 
            id="materialsNeeded" 
            name="materialsNeeded"
            value={materialsNeeded}
            onChange={(e) => setMaterialsNeeded(e.target.value)}
          />
        </div>
        <button className="button" type="submit">Create Course</button>
        <button className="button button-secondary" onClick={() => navigate('/')}>Cancel</button>  
      </form>
    </div>
  );
};

export default CreateCourse;
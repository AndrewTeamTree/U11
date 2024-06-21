import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../link/api';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const course = {
      title,
      description,
      materialsNeeded,
      estimatedTime,
    };

    try {
      const response = await api('/courses', 'POST', course, {
        username: authUser.emailAddress,
        password: authUser.password,
      });

      if (response.status === 201) {
        const newCourse = await response.json();
        navigate(`/courses/${newCourse.id}`);
      } else {
        const message = await response.json();
        setErrors([`HTTP error! status: ${response.status}, message: ${JSON.stringify(message)}`]);
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

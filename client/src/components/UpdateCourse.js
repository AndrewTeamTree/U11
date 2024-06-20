





import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../link/api';

const UpdateCourse = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api(`/${id}`, 'GET');
        if (response.status === 200) {
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.description);
        } else {
          console.error('Failed to fetch course');
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api(`/${id}`, 'PUT', { title, description });
      if (response.status === 200) {
        navigate('/');
      } else {
        console.error('Failed to update course');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div>
      <h1>Update Course</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default UpdateCourse;



/*import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCourse = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  
  // Replace these with actual credentials
  const username = 'yourUsername';
  const password = 'yourPassword';
  const encodedCredentials = btoa(`${username}:${password}`);

*/



 /* useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (response.ok) {
          const course = await response.json();
          setTitle(course.title);
          setDescription(course.description);
          setEstimatedTime(course.estimatedTime || '');
          setMaterialsNeeded(course.materialsNeeded || '');
        } else {
          console.error('Error fetching course:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [id]);
*/
   /* e.preventDefault();
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        },
        body: JSON.stringify(course),
        credentials: 'include',
      });

      if (response.ok) {
        navigate(`/courses/${id}`);
      } else {
        const data = await response.json();
        if (data.errors) {
          setErrors(data.errors);
        } else {
          console.error('Error updating course:', data);
        }
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };
*/
    /*<div>
      <h1>Update Course</h1>
      {errors.length > 0 && (
        <div>
          <h2>Validation Errors</h2>
          <ul>
            {errors.map((error, index) => <li key={index}>{error}</li>)}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
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
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default UpdateCourse;*/

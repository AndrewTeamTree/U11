import React, { useState, useEffect } from 'react';
import '../styles/global.css';
import { api } from '../api';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api('/courses', 'GET');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched courses:', data); // Debugging log
          setCourses(data);
        } else {
          console.error('Failed to fetch courses:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {courses.length > 0 ? (
        courses.map((course) => (
          <a
            key={course.id}
            className="course--module course--link"
            href={`http://localhost:3000/courses/${course.id}`}
          >
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </a>
        ))
      ) : (
        <p>No courses available.</p>
      )}
      <a className="course--module course--add--module" href="create-course.html">
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </a>
    </div>
  );
};

export default Courses;

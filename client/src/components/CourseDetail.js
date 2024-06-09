import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await fetch(`/api/courses/${id}`);
        const contentType = response.headers.get('content-type');
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setCourse(data);
        } else {
          const text = await response.text();
          throw new Error(`Unexpected response format: ${text}`);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    fetchCourse();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!course) return <p>Loading...</p>;

  return (
    <div className="wrap">
      <h2>Course Detail</h2>
      <form>
        <div className="main--flex">
          <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{course.title}</h4>
            <p>By {course.User.firstName} {course.User.lastName}</p>
            <p>{course.description}</p>
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{course.estimatedTime}</p>
            <h3 className="course--detail--title">Materials Needed</h3>
            <ul className="course--detail--list">
              {course.materialsNeeded && course.materialsNeeded.split('\n').map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
          </div>
        </div>
      </form>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to={`/update-course/${course.id}`}>Update Course</Link>
          <button className="button">Delete Course</button>
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;

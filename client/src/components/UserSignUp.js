import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const UserSignUp = () => {
  const { accentColor } = useContext(AuthContext);
  const navigate = useNavigate();

  const name = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      name: name.current.value,
      username: username.current.value,
      password: password.current.value,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch('http://localhost:5000/api/users', fetchOptions);
      if (response.status === 201) {
        console.log(`${user.username} is successfully signed up and authenticated!`);
        navigate('/');
      } else if (response.status === 400) {
        const data = await response.json();
        console.log('Validation errors:', data.errors);
        setErrors(data.errors);
      } else {
        console.log('Unexpected response status:', response.status);
        throw new Error('Unexpected error');
      }
    } catch (error) {
      console.log('Error during sign up:', error);
      navigate('/error');
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className="form--centered">
      <h1>Sign Up</h1>
      <div>
        {errors.length > 0 && (
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input id="name" name="name" type="text" ref={name} placeholder="Name" />
          <input id="username" name="username" type="text" ref={username} placeholder="User Name" />
          <input id="password" name="password" type="password" ref={password} placeholder="Password" />
          <div className="pad-bottom">
            <button className="button" type="submit" style={{ background: accentColor }}>
              Sign Up
            </button>
            <button className="button button-secondary" style={{ color: accentColor }} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <p>
        Already have a user account?{' '}
        <Link style={{ color: accentColor }} to="/signin">
          Click here
        </Link>{' '}
        to sign in!
      </p>
    </div>
  );
};

export default UserSignUp;

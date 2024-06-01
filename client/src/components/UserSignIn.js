import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserSignIn = ({ userSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate user authentication
    if (username === 'user' && password === 'password') {
      userSignIn({ username });
      navigate('/courses');
    } else {
      setErrors(['Invalid username or password']);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className="form--centered">
      
        <h1>Sign In</h1>
        <div>
          {errors.length > 0 && (
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="User Name"
            />
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div className="pad-bottom">
              <button className="button" type="submit">Sign In</button>
              <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
        <p>
          Don't have a user account? <a href="/signup">Click here</a> to sign up!
        </p>
      </div>
    
  );
};

export default UserSignIn;




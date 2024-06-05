import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';



const UserSignIn = () => {
  const navigate = useNavigate();
  const { actions } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = { emailAddress, password };
    const user = await actions.signIn(credentials);
    if (user) {
      navigate('/courses');
    } else {
      setErrors(['Invalid email address or password']);
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
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            id="emailAddress"
            name="emailAddress"
            type="text"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            placeholder="Email Address"
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

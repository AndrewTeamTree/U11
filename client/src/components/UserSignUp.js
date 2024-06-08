import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const UserSignUp = () => {
  const navigate = useNavigate();
  const { actions } = useContext(AuthContext);
  const [error, setError] = useState('');
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };

    console.log('Form data submitted:', newUser); // Log the form data
    
    try {
      const response = await actions.createUser(newUser);
      console.log('Payload being sent:', newUser); // Log the payload being sent
      if (response) {
        console.log('User created successfully');
        navigate('/signin');
      } else {
        setError('User creation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      try {
        const errorMessage = JSON.parse(error.message.split('message: ')[1]).errors.join(', ');
        setError(`An error occurred during sign up: ${errorMessage}`);
      } catch (parseError) {
        setError('An error occurred during sign up. Please try again.');
      }
    }
  };

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" ref={firstName} placeholder="First Name" required />
        
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" ref={lastName} placeholder="Last Name" required />
        
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} placeholder="email@example.com" required />
        
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" ref={password} placeholder="Password" required />
        
        {error && <p className="error">{error}</p>}
        
        <button className="button" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default UserSignUp;

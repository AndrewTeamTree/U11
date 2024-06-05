import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

// Context
import AuthContext from "../context/AuthContext";

const UserSignUp = () => {
  // React Hooks
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { accentColor } = useContext(AuthContext);
  const navigate = useNavigate();
  const { actions } = useContext(AuthContext);
  const [formErrors, setFormErrors] = useState(null); // Updated formErrors state

  // Handle form submission to Create a new User
  const onSubmit = async (data) => {
    console.log("Form data submitted:", data);

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);

      if (response.status === 201) {
        console.log("User created successfully");
        await actions.signIn(data);
        navigate('/');
      } else if (response.status === 400) {
        const responseData = await response.json();
        console.log("Errors:", responseData.errors);
        setFormErrors(responseData.errors);
      } else {
        console.log("Unexpected response status:", response.status, response.statusText);
        const text = await response.text(); // Handle non-JSON responses
        console.log("Response text:", text);
        setFormErrors(['An unexpected error occurred. Please try again later.']);
      }
    } catch (error) {
      console.log('Error:', error.message);
      setFormErrors(['An unexpected error occurred. Please try again later.']);
    }
  };

  return (
    <div className="form--centered">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
       <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          {...register('firstName', { required: 'First name is required' })}
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          {...register('lastName', { required: 'Last name is required' })}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}

        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          {...register('emailAddress', { required: 'Email is required' })}
        />
        {errors.emailAddress && <span>{errors.emailAddress.message}</span>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <div className="pad-bottom">
          <button className="button" type="submit">
            Sign Up
          </button>
          <button className="button button-secondary" type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
      {formErrors && (
        <ul className="validation-errors">
          {formErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
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

import React, { useContext, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const UserSignIn = () => {
  const navigate = useNavigate();
  const { actions } = useContext(AuthContext);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const emailAddress = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = {
      username: emailAddress.current.value,
      password: password.current.value,
    };

    try {
      // Perform form validation before submitting
      if (!validateEmail(credentials.username)) {
        setEmailError("Please enter a valid email address.");
        return;
      }
      if (!validatePassword(credentials.password)) {
        setPasswordError("Password must be at least 8 characters long.");
        return;
      }

      const user = await actions.signIn(credentials);
      if (user) {
        navigate("/");
      } else {
        setEmailError("Invalid email or password");
      }
    } catch (error) {
      console.log("Error: ", error.message);
      setEmailError("Sign-in failed. Please try again.");
    }
  };

  const validateEmail = (email) => {
    // Simple email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    // Validate password length
    return password.length >= 8;
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          ref={emailAddress}
          placeholder="email@example.com"
          onChange={() => setEmailError("")} // Clear email error on change
        />
        {emailError && <p className="error">{emailError}</p>}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          ref={password}
          placeholder="8-20 characters"
          onChange={() => setPasswordError("")} // Clear password error on change
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <button className="button" type="submit">
          Sign In
        </button>
      </form>
      <p>
        Don't have a user account? Click here to{" "}
        <Link to="/signup">sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
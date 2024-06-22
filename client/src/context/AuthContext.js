import React, { createContext, useState } from 'react';
import Cookies from "js-cookie";
import users from '../link/users'; 
import api from '../link/api'; 

const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const cookie = Cookies.get("authenticatedUser");
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);




const signIn = async (credentials) => {
  try {
    const response = await users('', 'GET', null, credentials); 
    if (response.status === 200) {
      const user = await response.json();
      user.password = credentials.password; 
      setAuthUser(user);
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1, sameSite: 'None', secure: true });
      return user;
    } else if (response.status === 401) {
      console.error('Unauthorized: Invalid credentials');
      return null;
    } else {
      const errorMessage = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }
  } catch (error) {
    console.error('SignIn Error: ', error.message);
    return null;
  }
};
/*
  const signIn = async (credentials) => {
    try {
      const response = await users('', 'GET', null, credentials); 
      if (response.status === 200) {
        const user = await response.json();
        user.password = credentials.password; 
        setAuthUser(user);
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1, sameSite: 'None', secure: true });
        return user;
      } else if (response.status === 401) {
        console.error('Unauthorized: Invalid credentials');
        return null;
      } else {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
      }
    } catch (error) {
      console.error('SignIn Error: ', error.message);
      return null;
    }
  };
*/
  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
  };

  const createUser = async (user) => {
    try {
      const response = await users('', 'POST', user); // Assuming this API call creates a new user
      if (response.status === 201) {
        return await response.json();
      } else {
        const message = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(message)}`);
      }
    } catch (error) {
      console.log('Error creating user: ', error.message);
      throw error;
    }
  };

const createCourse = async (courseData) => {
  try {
    const response = await api('/courses', 'POST', courseData); 
    if (response.status === 201) {
      const course = await response.json();
      return course;
    } else {
      const message = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(message)}`);
    }
  } catch (error) {
    console.error('Error creating course: ', error.message);
    throw error;
  }
};

  const value = {
    authUser,
    actions: {
      signIn,
      signOut,
      createUser,
      createCourse
    }
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;

import React, { createContext, useState } from 'react';
import Cookies from "js-cookie";
import users from '../link/users';

// Initialize Context
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
        Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
        return user;
      } else if (response.status === 401) {
        return null;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log('Error: ', error.message);
      return null;
    }
  };

  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
  };

  const createUser = async (user) => {
    try {
      console.log('Payload being sent:', user); // Log the payload
      const response = await users('/users', 'POST', user);
      if (response.status === 201) {
        return response.json();
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log('Error: ', error.message);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{
      authUser,
      actions: {
        signIn,
        signOut,
        createUser
      }
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

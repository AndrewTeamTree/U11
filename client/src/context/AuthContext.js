import React, { createContext, useState } from 'react';
import Cookies from "js-cookie";

const api = (url, method = "GET", body = null, credentials = null) => {
  const options = {
    method,
    headers: {}
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json; charset=utf-8";
  };

  if (credentials) {
    const encodedCreds = btoa(
      `${credentials.username}:${credentials.password}`
    );
    options.headers.Authorization = `Basic ${encodedCreds}`;
  }

  return fetch(url, options);
};

// Initialize Context
const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const cookie = Cookies.get("authenticatedUser");
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

  const signIn = async (credentials) => {
    try {
      const response = await api('/api/users', 'GET', null, credentials);
      if (response.status === 200) {
        const user = await response.json();
        user.user.password = credentials.password;
        setAuthUser(user);
        Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1});
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
  }

  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
  };

  return (
    <AuthContext.Provider value={{
      authUser,
      actions: {
        signIn,
        signOut
      }
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
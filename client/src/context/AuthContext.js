import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const userSignIn = (user) => {
    setAuthUser(user);
  };

  const userSignOut = () => {
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, userSignIn, userSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

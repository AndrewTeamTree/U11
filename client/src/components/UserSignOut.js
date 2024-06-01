import React from 'react';

const SignOut = ({ userSignOut }) => {
  return (
     <div className="form--centered">
    <button onClick={userSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;



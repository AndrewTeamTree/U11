import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/global.css';

const Header = () => {
  const { authUser, userSignOut } = useContext(AuthContext);

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo"><Link to="/">Courses</Link></h1>
        <nav>
          {authUser ? (
            <ul className="header--signedin">
              <li>Welcome, {authUser.username}!</li>
              <li><button onClick={userSignOut}>Sign Out</button></li>
            </ul>
          ) : (
            <ul className="header--signedout">
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;


import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import '../styles/global.css'

const Header = () => {
  // Accessing authentication user data from context
  const { authUser } = useContext(AuthContext)

  // JSX structure for rendering the header
  return (
    <header>
      <div className="wrap header--flex">
        {/* Logo linking to the home page */}
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        {/* Conditional rendering based on user authentication */}
        <nav>
          {authUser ? ( // If user is authenticated
            <ul className="header--signedin">
              {/* Displaying authenticated user's name */}
              <li>
                Welcome {authUser.user.firstName} {authUser.user.lastName}!
              </li>
              {/* Link to sign out */}
              <li>
                <Link to="/signout">Sign Out</Link>
              </li>
            </ul>
          ) : ( // If user is not authenticated
            <ul className="header--signedout">
              {/* Link to sign up */}
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              {/* Link to sign in */}
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header

import React from 'react'
import { Link } from 'react-router-dom'

// Functional component for rendering a "Not Found" page
const NotFound = () => (
  <div className="bounds">
    {/* Actions bar with a link to return to the home page */}
    <div className="actions--bar">
      <Link to='/' className="button button-secondary">
        Return to List
      </Link>
    </div>
    {/* Heading indicating the error status */}
    <h1>404</h1>
    {/* Message informing the user about the page not found */}
    <p>Sorry! The page you were looking for cannot be found!</p>
  </div>
)

export default NotFound

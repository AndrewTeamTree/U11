import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

// Functional component for handling private routes
const PrivateRoute = () => {
  const { authUser } = useContext(AuthContext)

  // If authUser exists (user is authenticated), render the child routes (Outlet)
  // If authUser does not exist (user is not authenticated), redirect to the sign-in page
  return authUser ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute

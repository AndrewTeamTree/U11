import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const UserSignOut = () => {
  const { actions } = useContext(AuthContext) // Accesses signOut function from AuthContext

  useEffect(() => {
    actions.signOut() // Calls the signOut function from AuthContext on component mount
  }, [actions])

  return <Navigate to="/" /> // Redirects the user to the home page ("/")
}

export default UserSignOut

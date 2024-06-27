
import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const UserSignOut = () => {
  const { actions } = useContext(AuthContext)

  useEffect(() => {
    actions.signOut()
  }, [actions])

  return <Navigate to="/" />
}

export default UserSignOut

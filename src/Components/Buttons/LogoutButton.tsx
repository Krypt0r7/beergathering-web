import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@material-ui/core'


const LogoutButton = () => {
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({ returnTo: window.location.origin })
  }
  return (
    <Button onClick={() => handleLogout()}>Logout</Button>
  )
}

export default LogoutButton
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'


const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0()
  return (
    <Button sx={{ fontWeight: 'bold' }} onClick={() => loginWithRedirect({ screen_hint: "Sign Up" })}>Signup</Button>
  )
}

export default SignUpButton
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@material-ui/core'


const SignupButton = () => {
  const {loginWithPopup} = useAuth0()
  return (
    <Button onClick={() => loginWithPopup({screen_hint: "signup"})}>Signup</Button>
  )
}

export default SignupButton
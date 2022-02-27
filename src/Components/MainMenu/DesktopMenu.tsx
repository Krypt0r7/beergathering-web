import React from 'react';
import { Box } from '@mui/material';
import DarkSwitch from './DarkSwitch';
import LoginButton from './Buttons/LoginButton';
import SignUpButton from './Buttons/SignUpButton';
import LogoutButton from './Buttons/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import Heading from './Heading';
import { useHistory } from 'react-router-dom';
import useCustomTheme from '../../Hooks/useCustomTheme';

const DesktopMenu = () => {
  const { isAuthenticated } = useAuth0()
  const { isDark } = useCustomTheme()
  const history = useHistory()

  return (
    <>
      <Box>
        <Heading onClick={() => history.push('/')} dark={isDark}>BEER GATHERING</Heading>
        <Box>

        </Box>
      </Box>
      <Box display='flex'>
        <Box marginRight={2}>
          <DarkSwitch />
        </Box>
        {!isAuthenticated ? (
          <>
            <LoginButton />
            <SignUpButton />
          </>
        ) : (
          <LogoutButton />
        )}
      </Box>
    </>
  )
}

export default DesktopMenu;

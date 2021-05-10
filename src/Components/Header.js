import {
  AppBar,
  Box,
  Button,
  Icon,
  IconButton,
  Switch,
  Toolbar
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import styled from 'styled-components'
import useCustomTheme from '../Hooks/useCustomTheme'
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh'
import Brightness5Icon from '@material-ui/icons/Brightness5'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './Buttons/LoginButton'
import SignupButton from './Buttons/SignupButton'

const StyledMenuIcon = styled(MenuIcon)`
  color: white;
`
const ToolbarContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
const Heading = styled.h1`
  font-size: 1em;
`

const Header = () => {
  const { isDark, switchTheme } = useCustomTheme()
  const { isAuthenticated, logout } = useAuth0()

  // const isLarge = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <>
      <AppBar>
        <Toolbar>
          <ToolbarContainer>
            <Box>
              {isAuthenticated && (
                <IconButton>
                  <StyledMenuIcon />
                </IconButton>
              )}
            </Box>
            <Heading>BEER GATHERING</Heading>
            <Box display='flex'>
              <Box display='flex' alignItems='center'>
                <Icon>
                  {isDark ? <Brightness5Icon /> : <BrightnessHighIcon />}
                </Icon>
                <Switch checked={isDark} onChange={() => switchTheme()} />
              </Box>
              {!isAuthenticated ? (
                <>
                  <LoginButton />
                  <SignupButton />
                </>
              ) : (
                <Button
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </Button>
              )}
            </Box>
          </ToolbarContainer>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header

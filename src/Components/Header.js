import {
  AppBar,
  Box,
  IconButton,
  Switch,
  Toolbar,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import styled from 'styled-components'
import useCustomTheme from '../Hooks/useCustomTheme'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './Buttons/LoginButton'
import SignupButton from './Buttons/SignupButton'
import LogoutButton from './Buttons/LogoutButton'

const StyledMenuIcon = styled(MenuIcon)`
  ${({ dark }) => (dark ? 'color: white;' : 'color: black;')}
`
const ToolbarContainer = styled.div`
  display: flex;
  width: 100%;
  ${({ large }) => (large ? 'justify-content: space-between;' : 'justify-content: flex-start;')}
  align-items: center;
`
const Heading = styled.h1`
  font-size: 1em;
  ${({ dark }) => (dark ? 'color: white;' : 'color: #333;')}
`

const displayMobile = (isDark, isLarge, isAutenticated) => (
  <>
    <IconButton>
      <StyledMenuIcon dark={isDark} />
    </IconButton>
    <Heading dark={isDark}>BEER GATHERING</Heading>
  </>
)

const displayDesktop = (isDark, isAuthenticated, switchTheme) => (
  <>
    <Heading dark={isDark}>BEER GATHERING</Heading>
    <Box display='flex'>
      <Box display='flex' alignItems='center'>
        <Switch checked={isDark} onChange={() => switchTheme()} />
      </Box>
      {!isAuthenticated ? (
        <>
          <LoginButton />
          <SignupButton />
        </>
      ) : (
        <LogoutButton />
      )}
    </Box>
  </>
)

const Header = () => {
  const theme = useTheme()
  const { isDark, switchTheme } = useCustomTheme()
  const { isAuthenticated } = useAuth0()

  const isLarge = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <>
      <AppBar
        position='static'
        style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar>
          <ToolbarContainer large={isLarge}>
            {isLarge
              ? displayDesktop(isDark, isAuthenticated, switchTheme)
              : displayMobile(isDark, isLarge, isAuthenticated)}
          </ToolbarContainer>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header

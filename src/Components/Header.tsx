import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import useCustomTheme from '../Hooks/useCustomTheme'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './Buttons/LoginButton'
import SignUpButton from './Buttons/SignUpButton'
import LogoutButton from './Buttons/LogoutButton'
import Drawer from './Drawer'
import DarkSwitch from './DarkSwitch'

interface StyledMenuIconProps {
  colour: string
}

interface ToolbarContainerProps {
  large: boolean
}

interface HeadingProps {
  dark: boolean
}

const StyledMenuIcon = styled(MenuIcon) <StyledMenuIconProps>`
  ${({ colour }) => (`color: ${colour};`)}
`
const ToolbarContainer = styled.div<ToolbarContainerProps>`
  display: flex;
  width: 100%;
  ${({ large }) => (large ? 'justify-content: space-between;' : 'justify-content: flex-start;')}
  align-items: center;
`
const Heading = styled.h1<HeadingProps>`
  font-size: 1em;
  white-space: nowrap;
  ${({ dark }) => (dark ? 'color: white;' : 'color: #333;')}
`

const displayMobile = (isDark: boolean, drawerOpen: boolean, setDrawerOpen: Function, history: any) => (
  <Box display='flex' alignItems="center">
    <IconButton onClick={() => setDrawerOpen(true)} >
      <StyledMenuIcon colour={isDark ? 'white' : 'black'} />
    </IconButton>
    <Heading onClick={() => history.push('/')} dark={isDark}>BEER GATHERING</Heading>
    <Drawer setDrawerOpen={setDrawerOpen} open={drawerOpen} />
  </Box>
)



const displayDesktop = (isDark: boolean, isAuthenticated: boolean, history: any) => (
  <>
    <Heading onClick={() => history.push('/')} dark={isDark}>BEER GATHERING</Heading>
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

const Header = () => {
  const theme = useTheme()
  const history = useHistory()
  const { isDark } = useCustomTheme()
  const { isAuthenticated } = useAuth0()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const isLarge = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <>
      <AppBar
        position='static'
        sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar>
          <ToolbarContainer large={isLarge}>
            {isLarge
              ? displayDesktop(isDark, isAuthenticated, history)
              : displayMobile(isDark, drawerOpen, setDrawerOpen, history)
            }
          </ToolbarContainer>
        </Toolbar>
      </AppBar>

    </>
  )
}

export default Header

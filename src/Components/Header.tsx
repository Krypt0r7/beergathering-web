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
import useCustomTheme from '../Hooks/useCustomTheme'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './Buttons/LoginButton'
import SignUpButton from './Buttons/SignUpButton'
import LogoutButton from './Buttons/LogoutButton'
import Drawer from './Drawer'
import DarkSwitch from './DarkSwitch'

interface StyledMenuIconProps {
  dark: boolean
}

interface ToolbarContainerProps {
  large: boolean
}

interface HeadingProps {
  dark: boolean
}

const StyledMenuIcon = styled(MenuIcon) <StyledMenuIconProps>`
  ${({ dark }) => (dark ? 'color: white;' : 'color: black;')}
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

interface DisplayMobileProps {
  isDark: boolean,
  isAuthenticated: boolean
}


const DisplayMobile = ({ isDark }: DisplayMobileProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Box display='flex' alignItems="center">
      <IconButton>
        <StyledMenuIcon dark={isDark} onClick={() => setDrawerOpen(true)} />
      </IconButton>
      <Heading dark={isDark}>BEER GATHERING</Heading>
      <Drawer setDrawerOpen={setDrawerOpen} open={drawerOpen} />
    </Box>
  )
}

interface DisplayDesktopProps {
  isDark: boolean,
  isAuthenticated: boolean
}

const DisplayDesktop = ({ isDark, isAuthenticated }: DisplayDesktopProps) => (
  <>
    <Heading dark={isDark}>BEER GATHERING</Heading>
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
  const { isDark } = useCustomTheme()
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
              ? <DisplayDesktop isAuthenticated={isAuthenticated} isDark={isDark} />
              : <DisplayMobile isDark={isDark} isAuthenticated={isAuthenticated} />
            }
          </ToolbarContainer>
        </Toolbar>
      </AppBar>

    </>
  )
}

export default Header

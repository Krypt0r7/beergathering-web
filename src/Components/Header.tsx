import {
  AppBar,
  Box,
  IconButton,
  Switch,
  Toolbar,
  useMediaQuery,
  useTheme
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import styled from 'styled-components'
import useCustomTheme from '../Hooks/useCustomTheme'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './Buttons/LoginButton'
import SignUpButton from './Buttons/SignUpButton'
import LogoutButton from './Buttons/LogoutButton'

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
  ${({ dark }) => (dark ? 'color: white;' : 'color: #333;')}
`

interface DisplayMobileProps {
  isDark: boolean,
  isAuthenticated: boolean
}


const DisplayMobile = ({ isDark }: DisplayMobileProps) => {
  return (
    <React.Fragment>
      <IconButton>
        <StyledMenuIcon dark={isDark} />
      </IconButton>
      <Heading dark={isDark}>BEER GATHERING</Heading>
    </React.Fragment>
  )
}

interface DisplayDesktopProps {
  isDark: boolean,
  isAuthenticated: boolean,
  switchTheme: Function
}

const DisplayDesktop = ({ isDark, isAuthenticated, switchTheme }: DisplayDesktopProps) => (
  <>
    <Heading dark={isDark}>BEER GATHERING</Heading>
    <Box display='flex'>
      <Box display='flex' alignItems='center'>
        <Switch checked={isDark} onChange={() => switchTheme()} />
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
              ? <DisplayDesktop isAuthenticated={isAuthenticated} isDark={isDark} switchTheme={switchTheme} />
              : <DisplayMobile isDark={isDark} isAuthenticated={isAuthenticated} />}
          </ToolbarContainer>
        </Toolbar>
      </AppBar>

    </>
  )
}

export default Header

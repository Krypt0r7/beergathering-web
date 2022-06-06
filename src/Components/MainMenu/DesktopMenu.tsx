import React from 'react'
import { Box } from '@mui/material'
import DarkSwitch from './DarkSwitch'
import LoginButton from './Buttons/LoginButton'
import SignUpButton from './Buttons/SignUpButton'
import LogoutButton from './Buttons/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import Heading from './Heading'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import useCustomTheme from '../../Hooks/useCustomTheme'
import styled from 'styled-components'
import { routes } from '../../routes'

interface StyledLinkProps {
  dark?: boolean
}

const StyledLink = styled(RouterLink)<StyledLinkProps>`
  text-decoration: none;
  ${({ dark }) => (dark ? 'color: white;' : 'color: #333;')}
  margin-left: 2em;
`

const DesktopMenu = () => {
  const { isAuthenticated } = useAuth0()
  const { isDark } = useCustomTheme()
  const navigate = useNavigate()

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        width='100%'
        alignItems='center'
      >
        <Box display='flex' alignItems='center'>
          <Heading onClick={() => navigate('/')} dark={isDark}>
            BEER GATHERING
          </Heading>
          {routes
            .filter(x => x.menu)
            .map(r => (
              <StyledLink key={r.name} to={r.path} dark={isDark}>
                {r.name}
              </StyledLink>
            ))}
        </Box>
        <Box display='flex' alignItems='center'>
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
      </Box>
    </>
  )
}

export default DesktopMenu

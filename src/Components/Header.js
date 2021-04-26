import { AppBar, IconButton, Switch, Toolbar, useTheme } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import styled from 'styled-components'
import useCustomTheme from '../Hooks/useCustomTheme'

const Header = () => {
  const theme = useTheme()
  const {isDark, switchTheme} = useCustomTheme()

  // const isLarge = useMediaQuery(theme.breakpoints.up('sm'))

  const StyledMenuIcon = styled(MenuIcon)`
    color: white;
  `

  const ToolbarContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  `
  const Header = styled.h1`
  font-size: 1em;
  color: ${theme.text};
`

  return (
    <>
      <AppBar color='primary'>
        <Toolbar>
          <ToolbarContainer>
            <IconButton >
              <StyledMenuIcon />
            </IconButton>
            <Header>BEER GATHERING</Header>
            <Switch 
              checked={isDark} 
              onChange={() => switchTheme()}  
            />
          </ToolbarContainer>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </>
  )
}

export default Header

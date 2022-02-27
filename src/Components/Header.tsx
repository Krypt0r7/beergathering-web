import {
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme
} from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import DesktopMenu from './MainMenu/DesktopMenu'
import MobileMenu from './MainMenu/MobileMenu'



interface ToolbarContainerProps {
  large: boolean
}

const ToolbarContainer = styled.div<ToolbarContainerProps>`
  display: flex;
  width: 100%;
  ${({ large }) => (large ? 'justify-content: space-between;' : 'justify-content: flex-start;')}
  align-items: center;
`


const Header = () => {
  const theme = useTheme()

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
              ? <DesktopMenu />
              : <MobileMenu />
            }
          </ToolbarContainer>
        </Toolbar>
      </AppBar>

    </>
  )
}

export default Header

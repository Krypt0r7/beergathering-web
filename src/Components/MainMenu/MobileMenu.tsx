import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useCustomTheme from '../../Hooks/useCustomTheme';
import Heading from './Heading';
import Drawer from './Drawer';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

interface StyledMenuIconProps {
  colour: string
}

const StyledMenuIcon = styled(MenuIcon) <StyledMenuIconProps>`
  ${({ colour }) => (`color: ${colour};`)}
`

const MobileMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { isDark } = useCustomTheme()
  const history = useHistory()

  return (
    <Box display='flex' alignItems="center">
      <IconButton onClick={() => setDrawerOpen(true)} >
        <StyledMenuIcon colour={isDark ? 'white' : 'black'} />
      </IconButton>
      <Heading onClick={() => history.push('/')} dark={isDark}>BEER GATHERING</Heading>
      <Drawer setDrawerOpen={setDrawerOpen} open={drawerOpen} />
    </Box>
  )
}


export default MobileMenu

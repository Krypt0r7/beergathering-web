import React from 'react'
import { Divider, Drawer as MuiDrawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import styled from 'styled-components';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuth0 } from '@auth0/auth0-react';
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import { Box } from '@mui/system';
import DarkSwitch from './DarkSwitch';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

interface IDrawerProps {
  open: boolean,
  setDrawerOpen: Function
}

const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: "0 1em",
  justifyContent: 'flex-end',
  width: '100%'
}));

const StyledListItemText = styled(ListItemText)`
  text-align: center;
`

const Drawer = ({ open, setDrawerOpen }: IDrawerProps) => {
  const history = useHistory()
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()

  const changePage = (path: string) => {

    history.push(path)
    setDrawerOpen(false)
  }

  return (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="temporary"
      anchor="left"
      open={open}
      onClose={() => setDrawerOpen(false)}
    >
      <DrawerHeader>
        <Box display="flex" justifyContent="space-between" width='100%' marginTop={1}>

          <DarkSwitch />
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CancelIcon />
          </IconButton>
        </Box>
      </DrawerHeader>
      <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
        <List>
          <ListItem onClick={() => changePage('/')}>
            <ListItemText primary="Home" />
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem onClick={() => changePage('/search')}>
            <ListItemText primary="Search" />
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
          </ListItem>
        </List>

        <List>
          {!isAuthenticated ?
            <>
              <ListItem button onClick={() => loginWithRedirect()}>
                <StyledListItemText primary="Login" />
              </ListItem>
            </>
            :
            <ListItem button onClick={() => logout()}>
              <StyledListItemText primary="Logout" />
            </ListItem>

          }
        </List>
      </Box>
      <Divider />

    </MuiDrawer >
  )
}

export default Drawer
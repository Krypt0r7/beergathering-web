import React from 'react'
import { Divider, Drawer as MuiDrawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import styled from 'styled-components';
import CancelIcon from '@mui/icons-material/Cancel';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

interface IDrawerProps {
  open: boolean,
  setDrawerOpen: () => void
}

const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: "0 1em",
  justifyContent: 'flex-end',
}));

const Drawer = ({ open, setDrawerOpen }: IDrawerProps) => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()

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
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={setDrawerOpen}>
          <CancelIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {!isAuthenticated ?
          <ListItem button onClick={() => loginWithRedirect()}>
            <ListItemText primary="Login" />
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
          </ListItem>
          :
          <ListItem button onClick={() => logout()}>
            <ListItemText primary="Logout" />
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
          </ListItem>

        }
      </List>
      <Divider />

    </MuiDrawer>
  )
}

export default Drawer
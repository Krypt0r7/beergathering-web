import React from 'react'
import { Divider, Drawer as MuiDrawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import styled from 'styled-components';
import CancelIcon from '@mui/icons-material/Cancel';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutIcon from '@mui/icons-material/Logout';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Box } from '@mui/system';
import DarkSwitch from './DarkSwitch';

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
      variant="temporary"
      anchor="left"
      open={open}
      onClose={() => setDrawerOpen(false)}
    >
      <DrawerHeader style={{ width: '100%' }}>
        <Box display="flex" justifyContent="space-between" width='100%' marginTop={1}>

          <DarkSwitch />
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CancelIcon />
          </IconButton>
        </Box>
      </DrawerHeader>
      {/* <Divider /> */}
      <List>
        <ListItem>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {!isAuthenticated ?
          <>
            <Typography style={{ marginBlock: '.5em' }} textAlign="center">Account</Typography>
            <ListItem button onClick={() => loginWithRedirect()}>
              <ListItemText primary="Login" />
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
            </ListItem>
            <ListItem button onClick={() => loginWithRedirect({ screen_hint: "Sign Up" })}>
              <ListItemText primary="Register" />
              <HowToRegIcon>
                <LoginIcon />
              </HowToRegIcon>
            </ListItem>
          </>
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
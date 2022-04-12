import React from 'react'
import {
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import styled from 'styled-components'
import CancelIcon from '@mui/icons-material/Cancel'
import { useAuth0 } from '@auth0/auth0-react'
import { Box } from '@mui/system'
import DarkSwitch from './DarkSwitch'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 240

interface IDrawerProps {
  open: boolean
  setDrawerOpen: Function
}

const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 1em',
  justifyContent: 'flex-end',
  width: '100%'
}))

const StyledListItemText = styled(ListItemText)`
  text-align: center;
`

const Drawer = ({ open, setDrawerOpen }: IDrawerProps) => {
  const navigate = useNavigate()
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()

  const changePage = (path: string) => {
    navigate(path)
    setDrawerOpen(false)
  }

  return (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
      variant='temporary'
      anchor='left'
      open={open}
      onClose={() => setDrawerOpen(false)}
    >
      <DrawerHeader>
        <Box
          display='flex'
          justifyContent='space-between'
          width='100%'
          marginTop={1}
        >
          <DarkSwitch />
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CancelIcon />
          </IconButton>
        </Box>
      </DrawerHeader>
      <Box
        display='flex'
        marginTop={3}
        marginBottom={2}
        marginX={3}
        flexDirection='column'
        justifyContent='space-between'
        height='100%'
      >
        <List>
          <ListItem onClick={() => changePage('/')}>
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 'bold'
              }}
              primary='Home'
            />
          </ListItem>
          <ListItem onClick={() => changePage('/search')}>
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 'bold'
              }}
              primary='Search'
            />
          </ListItem>
        </List>

        <List>
          {!isAuthenticated ? (
            <>
              <ListItem button onClick={() => loginWithRedirect()}>
                <StyledListItemText
                  primaryTypographyProps={{
                    variant: 'body2'
                  }}
                  primary='Login'
                />
              </ListItem>
            </>
          ) : (
            <ListItem button onClick={() => logout()}>
              <StyledListItemText
                primaryTypographyProps={{
                  variant: 'body2'
                }}
                primary='Logout'
              />
            </ListItem>
          )}
        </List>
      </Box>
      <Divider />
    </MuiDrawer>
  )
}

export default Drawer

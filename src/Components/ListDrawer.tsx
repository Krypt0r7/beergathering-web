import { gql, useMutation } from '@apollo/client'
import { Add, PlaylistAdd, PlaylistRemove } from '@mui/icons-material'
import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack
} from '@mui/material'
import React, { useState } from 'react'
import useCustomTheme from '../Hooks/useCustomTheme'
import { IList } from '../Interfaces/List/IList'
import NewListDialog from './NewListDialog'

interface IListDrawerProps {
  open: boolean
  onClose: Function
  lists: IList[]
  refetch: Function
  beerId?: string
}

const ADD_TO_LIST = gql`
  mutation AddBeerToListMutation($input: List_AddBeerToListInput) {
    list {
      addBeerToList(input: $input)
    }
  }
`

const REMOVE_FROM_LIST = gql`
  mutation RemoveBeerFromListMutation($input: List_RemoveBeerFromListInput) {
    list {
      removeBeerFromList(input: $input)
    }
  }
`

const ListDrawer: React.FC<IListDrawerProps> = ({
  open,
  onClose,
  lists,
  refetch,
  beerId
}) => {
  const { isLarge } = useCustomTheme()
  const [newListDialogOpen, setNewListDialogOpen] = useState(false)

  const [addToList] = useMutation(ADD_TO_LIST, { onCompleted: () => refetch() })
  const [removeFromList] = useMutation(REMOVE_FROM_LIST, {
    onCompleted: () => refetch()
  })

  return (
    <>
      <Drawer
        PaperProps={{
          sx: { minWidth: isLarge ? '25vw' : '75vw' }
        }}
        open={open}
        onClose={() => onClose(false)}
        anchor='right'
      >
        <Stack direction='column' justifyContent='space-between'>
          <List>
            {lists?.map(x => (
              <ListItem key={x.id}>
                <ListItemText primary={x.name} secondary={x.description} />
                <ListItemSecondaryAction>
                  {x.isInList ? (
                    <IconButton
                      onClick={() =>
                        removeFromList({
                          variables: { input: { id: x.id, beerId } }
                        })
                      }
                    >
                      <PlaylistRemove />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() =>
                        addToList({
                          variables: { input: { id: x.id, beerId } }
                        })
                      }
                    >
                      <PlaylistAdd />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button
            sx={{
              marginX: 2
            }}
            variant='outlined'
            onClick={() => setNewListDialogOpen(true)}
            endIcon={<Add />}
          >
            New list
          </Button>
        </Stack>
      </Drawer>
      <NewListDialog
        open={newListDialogOpen}
        onClose={() => {
          setNewListDialogOpen(false)
          refetch()
        }}
      />
    </>
  )
}

export default ListDrawer

import { gql, useMutation } from '@apollo/client'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'

interface INewListProps {
  open: boolean
  onClose: Function
}

const NEW_LIST_MUTATION = gql`
  mutation CreateListMutation($input: List_CreateListInput) {
    list {
      createListMutation(input: $input)
    }
  }
`

const StyledDialogTitle = styled(DialogTitle)`
  font-size: 1.2em;
`

const NewListDialog: React.FC<INewListProps> = ({ open, onClose }) => {
  const [listProps, setListProps] = useState({ description: '', name: '' })

  const [saveNewList] = useMutation(NEW_LIST_MUTATION)

  const handlePropChange = (name: string, value: string) => {
    setListProps({ ...listProps, [name]: value })
  }

  return (
    <Dialog fullWidth maxWidth='sm' open={open} onClose={() => onClose()}>
      <StyledDialogTitle>Create a new list</StyledDialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            fullWidth
            onChange={e => handlePropChange('name', e.target.value)}
            value={listProps.name}
            label='Name'
          />
          <TextField
            fullWidth
            onChange={e => handlePropChange('description', e.target.value)}
            value={listProps.description}
            label='Description'
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button
          onClick={() => {
            saveNewList({
              variables: {
                input: {
                  description: listProps.description,
                  name: listProps.name
                }
              }
            })
            onClose()
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewListDialog

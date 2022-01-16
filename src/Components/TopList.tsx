import { Box, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material'
import React from 'react'
import { IBeerList } from '../Interfaces/IBeerList'

interface ITopListProps {
  list: IBeerList[],
  name: string
}

const TopList = ({ list, name }: ITopListProps) => {

  return (
    <Box minWidth="22em" marginBottom={2} marginX={1}>
      <Paper>
        <Box padding={2}>
          <Typography textAlign="center" variant="h3">{name}</Typography>
          <List>
            {list.map((x, i) => (
              <ListItem key={i} >
                <ListItemAvatar>{i + 1}</ListItemAvatar>
                <ListItemText primary={x.name} secondary={x.alcohol + " %"} />
              </ListItem>
            ))}
          </List>

        </Box>
      </Paper>
    </Box>
  )
}

export default TopList
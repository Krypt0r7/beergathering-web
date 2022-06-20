import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'
import React from 'react'

interface IBeerList {
  name: string
  alcohol: number
}

interface ITopListProps {
  beerList: IBeerList[]
  name: string
}

const TopList = ({ beerList, name }: ITopListProps) => {
  return (
    <Box minWidth='22em' marginBottom={2} marginX={1}>
      <Paper>
        <Box padding={2}>
          <Typography textAlign='center' variant='h3'>
            {name}
          </Typography>
          <List>
            {beerList.map((x, i) => (
              <ListItem key={i}>
                <ListItemAvatar>{i + 1}</ListItemAvatar>
                <ListItemText primary={x.name} secondary={x.alcohol + ' %'} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  )
}

export default TopList

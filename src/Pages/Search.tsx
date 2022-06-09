import React, { useEffect, useState } from 'react'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { ArrowRight, SearchSharp } from '@mui/icons-material'
import { gql, useLazyQuery } from '@apollo/client'
import { useDebounce } from '../Hooks/useDebounce'
import { IBeerQuery } from '../Interfaces/ISearchBeer'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ContentContainer from '../Components/ContentContainer'

const SEARCH_QUERY = gql`
  query SearchBeersQuery($model: Beer_SearchBeersModel) {
    beer {
      searchBeersQuery(model: $model) {
        id
        name
        alcohol
        breweryName
      }
    }
  }
`

const StyledListItem = styled(ListItemButton)`
  margin-bottom: 1em;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const Search = () => {
  const [searchParam, setSearchParam] = useState('')
  const debouncedSearch = useDebounce(searchParam, 500)

  const [execSearch, { data }] = useLazyQuery<IBeerQuery>(SEARCH_QUERY)

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length > 2) {
      execSearch({
        variables: {
          model: {
            searchParam: debouncedSearch
          }
        }
      })
    }
  }, [debouncedSearch, execSearch])

  return (
    <ContentContainer maxWidth='md'>
      <Box marginY={2}>
        <TextField
          value={searchParam}
          onChange={e => setSearchParam(e.target.value)}
          variant='standard'
          fullWidth
          InputProps={{
            endAdornment: <SearchSharp />
          }}
        />
      </Box>
      <Box>
        {data && (
          <List sx={{ width: '100%' }}>
            {data?.beer.searchBeersQuery.map(beer => (
              <Paper key={beer.id} style={{ width: '100%' }}>
                <StyledLink to={`/beers/${beer.id}`}>
                  <StyledListItem>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography>{beer.name}</Typography>
                          <Typography>{beer.breweryName}</Typography>
                        </Box>
                      }
                      secondary={`${beer.alcohol} %`}
                    />
                    <ListItemIcon>
                      <ArrowRight />
                    </ListItemIcon>
                  </StyledListItem>
                </StyledLink>
              </Paper>
            ))}
          </List>
        )}
      </Box>
    </ContentContainer>
  )
}

export default Search

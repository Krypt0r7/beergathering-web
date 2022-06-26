import React, { useEffect } from 'react'
import {
  Box,
  Fab,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Add, ArrowRight, SearchSharp } from '@mui/icons-material'
import { gql, useLazyQuery } from '@apollo/client'
import { useDebounce } from '../Hooks/useDebounce'
import { IQuery } from '../Interfaces/IQuery'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ContentContainer from '../Components/ContentContainer'
import { useLocalStorage } from '../Hooks/useLocalStorage'

const SEARCH_QUERY = gql`
  query SearchBeers($model: Beer_SearchBeersModel) {
    beer {
      searchBeers(model: $model) {
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
  const [searchParam, setSearchParam] = useLocalStorage('searchParam', '')
  const debouncedSearch = useDebounce(searchParam, 500)

  const [execSearch, { data }] = useLazyQuery<IQuery>(SEARCH_QUERY)

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

  const searchData = searchParam.length > 2 ? data?.beer.searchBeers : []

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
      <Stack marginBottom={2}>
        {data && (
          <List sx={{ width: '100%' }}>
            {searchData?.map(beer => (
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
        {searchData?.length === 0 && (
          <StyledLink to='/beers/new' style={{ alignSelf: 'center' }}>
            <Fab variant='extended' size='small'>
              Can't find anything? Create new
              <Add sx={{ ml: 1 }} />
            </Fab>
          </StyledLink>
        )}
      </Stack>
    </ContentContainer>
  )
}

export default Search

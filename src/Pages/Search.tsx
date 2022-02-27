import React, { useEffect, useState } from 'react'
import { Box, Container, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material'
import { ArrowRight, SearchSharp } from '@mui/icons-material'
import { gql, useLazyQuery } from '@apollo/client';
import { useDebounce } from '../Hooks/useDebounce'
import { IBeerQuery } from '../Interfaces/ISearchBeer';

const SEARCH_QUERY = gql`
query SearchQuery ($input: BeerSearchInput){
  beer {
    searchBeerQuery(input: $input) {
      id
      name
      alcohol
    }
  }
}
`

const Search = () => {
  const [searchParam, setSearchParam] = useState('')
  const debouncedSearch = useDebounce(searchParam, 500)

  const [execSearch, { data }] = useLazyQuery<IBeerQuery>(SEARCH_QUERY)


  useEffect(() => {
    if (debouncedSearch) {
      execSearch({
        variables: {
          input: {
            searchParam: debouncedSearch
          }
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);


  return (
    <Container maxWidth="md" >
      <Box marginY={2}>
        <TextField
          value={searchParam}
          onChange={e => setSearchParam(e.target.value)}
          variant='standard'
          fullWidth
          InputProps={{
            endAdornment:
              <SearchSharp />
          }}
        />
      </Box>
      <Box>
        {data &&
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {data?.beer.searchBeerQuery.map(beer => (

              <ListItem>
                <ListItemText primary={beer.name} secondary={beer.alcohol} />
                <ListItemIcon>
                  <ArrowRight />
                </ListItemIcon>
              </ListItem>

            ))
            }
          </List>
        }
      </Box>
    </Container >
  )
}

export default Search
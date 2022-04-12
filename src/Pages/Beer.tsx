import { gql, useQuery } from '@apollo/client'
import { Avatar, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import ContentContainer from '../Components/ContentContainer'
import useCustomTheme from '../Hooks/useCustomTheme'
import { IBeerQueryModel } from '../Interfaces/IBeerQuery'

const StyledImage = styled('img')`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const BEER_QUERY = gql`
  query($query: BeerQueryModelInput) {
    beer {
      beerQuery(model: $query) {
        id
        name
        type
        alcohol
        breweryName
        imageUrl
        containers {
          type
          price
          volume
        }
      }
    }
  }
`

const Beer = () => {
  const { beerId } = useParams()
  const { isLarge } = useCustomTheme()

  const { data } = useQuery<IBeerQueryModel>(BEER_QUERY, {
    variables: {
      query: {
        id: beerId
      }
    }
  })

  const beer = data?.beer.beerQuery

  if (!beer) return null

  return (
    <ContentContainer>
      <Stack direction={isLarge ? 'row' : 'column'}>
        <Box
          sx={{
            width: isLarge ? '40%' : '100%',
            marginBottom: isLarge ? 0 : 2
          }}
          height='55vh'
        >
          <StyledImage
            alt='Beer image'
            src={beer?.imageUrl || '/images/beer-image.webp'}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            maxWidth: isLarge ? '50%' : undefined,
            marginLeft: isLarge ? 4 : 0
          }}
        >
          <Typography variant='h2'>{beer?.name}</Typography>
          <Typography variant='overline'>{beer?.type}</Typography>
          <Typography variant='h4'>{beer?.alcohol} %</Typography>
          <Stack direction={isLarge ? 'row' : 'column'} spacing={2} marginY={2}>
            {beer.containers?.map(x => (
              <Paper
                sx={{
                  padding: 2,
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: isLarge ? '250px' : undefined,
                  width: isLarge ? undefined : '100%'
                }}
              >
                <Avatar sx={{ marginRight: 2 }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    minWidth: '150px'
                  }}
                >
                  <Stack>
                    <Typography variant='h4'>{x.type}</Typography>
                    <Typography variant='body2'>{x.volume} ml</Typography>
                  </Stack>
                  <Typography variant='h3' fontWeight='bold'>
                    {x.price.toFixed(2)} kr
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Stack>
    </ContentContainer>
  )
}

export default Beer

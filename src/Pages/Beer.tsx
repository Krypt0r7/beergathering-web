import { gql, useMutation, useQuery } from '@apollo/client'
import {
  Avatar,
  Stack,
  Typography,
  Box,
  Button,
  Card,
  CardHeader,
  IconButton
} from '@mui/material'
import {
  Favorite,
  CheckRounded,
  ListAltRounded,
  MoreVert
} from '@mui/icons-material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import ContentContainer from '../Components/ContentContainer'
import useCustomTheme from '../Hooks/useCustomTheme'
import { IQuery } from '../Interfaces/IQuery'
import ListDrawer from '../Components/ListDrawer'

const StyledImage = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const TOGGLE_LIKE = gql`
  mutation ToggleLikeMutation($input: Like_ToggleLikeInput) {
    like {
      toggleLike(input: $input)
    }
  }
`
const TOGGLE_DRUNK = gql`
  mutation ToggleDrunkMutation($input: Drunk_ToggleDrunkInput) {
    drunk {
      toggleDrunk(input: $input)
    }
  }
`

const BEER_QUERY = gql`
  query BeerQuery($model: Beer_BeerModel) {
    beer {
      beer(model: $model) {
        id
        name
        type
        alcohol
        likes
        containers {
          type
          volume
          price
          systemetNumber
        }
        breweryName
        city
        country
        state
        imageUrl
        hasBeenDrunk
        liked
      }
    }
    list {
      usersLists {
        id
        name
        description
        beerIds
      }
    }
  }
`

const Beer = () => {
  const [showList, setShowList] = useState(false)
  const { beerId } = useParams()
  const { isLarge } = useCustomTheme()

  const { data, refetch } = useQuery<IQuery>(BEER_QUERY, {
    variables: {
      model: {
        id: beerId
      }
    }
  })

  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    variables: {
      input: {
        beerId
      }
    },
    onCompleted: () => refetch()
  })

  const [toggleDrunk] = useMutation(TOGGLE_DRUNK, {
    variables: {
      input: {
        beerId
      }
    },
    onCompleted: () => refetch()
  })

  const beer = data?.beer.beer

  return (
    <>
      <ContentContainer maxWidth='lg'>
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
          <Stack
            spacing={2}
            sx={{
              width: '100%',
              maxWidth: isLarge ? '50%' : undefined,
              marginLeft: isLarge ? 4 : 0
            }}
          >
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant='h2'>{beer?.name}</Typography>
                <Typography variant='subtitle1'>{beer?.type}</Typography>
                <Typography variant='h4'>{beer?.alcohol} %</Typography>
              </Stack>
              <Stack direction={isLarge ? 'row' : 'column'} spacing={2}>
                <Button
                  onClick={() => toggleLike()}
                  sx={{
                    whiteSpace: 'nowrap',
                    backgroundColor: beer?.liked ? 'darkred' : 'inherit',
                    color: beer?.liked ? 'white' : 'inherit'
                  }}
                  startIcon={<Favorite />}
                  variant={beer?.liked ? 'contained' : 'outlined'}
                >
                  I like this beer
                </Button>
                <Button
                  onClick={() => toggleDrunk()}
                  sx={{
                    whiteSpace: 'nowrap',
                    backgroundColor: beer?.hasBeenDrunk
                      ? 'darkGreen'
                      : 'inherit',
                    color: beer?.hasBeenDrunk ? 'white' : 'inherit'
                  }}
                  startIcon={<CheckRounded />}
                  variant={beer?.hasBeenDrunk ? 'contained' : 'outlined'}
                >
                  I've tasted this beer
                </Button>
              </Stack>
              <Button
                onClick={() => setShowList(true)}
                color='secondary'
                fullWidth
                sx={{
                  maxWidth: isLarge ? 250 : undefined,
                  whiteSpace: 'nowrap'
                }}
                startIcon={<ListAltRounded />}
                variant='outlined'
              >
                Add to list
              </Button>
            </Stack>
            <Stack>
              <Typography variant='overline'>Containers</Typography>
              <Stack direction={isLarge ? 'row' : 'column'} spacing={2}>
                {beer?.containers?.map((x, i) => (
                  <Card key={i}>
                    <CardHeader
                      avatar={<Avatar />}
                      title={
                        <Stack direction='row' spacing={4}>
                          <Typography>{x.type}</Typography>
                          <Typography>{`${x.volume} ml`}</Typography>
                        </Stack>
                      }
                      subheader={`${x.price.toFixed(2)} kr`}
                      action={
                        <IconButton sx={{ marginLeft: 2 }}>
                          <MoreVert />
                        </IconButton>
                      }
                    />
                  </Card>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </ContentContainer>
      <ListDrawer
        open={showList}
        onClose={() => setShowList(false)}
        lists={
          data?.list.usersLists.map(x => ({
            ...x,
            isInList: x.beerIds.includes(beerId || '')
          })) || []
        }
        refetch={refetch}
        beerId={beerId}
      />
    </>
  )
}

export default Beer

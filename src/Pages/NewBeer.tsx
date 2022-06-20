import { gql, useMutation, useQuery } from '@apollo/client'
import { Button, Stack, TextField, Typography } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import ContentContainer from '../Components/ContentContainer'
import CustomAutoComplete from '../Components/Inputs/CustomAutoComplete'
import useCustomTheme from '../Hooks/useCustomTheme'
import { IQuery } from '../Interfaces/IQuery'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom'

interface IBeerProps {
  name: string
  breweryName: string
  type: string
  style: string
  alcohol: number
  city: string
  state: string
  country: string
  hops: string[]
  imageUrl: string
}

const NEW_BEER_QUERY = gql`
  query NewBeerQuery {
    beer {
      breweries {
        name
        city
        country
        state
      }
      hops
      beerTypes {
        id
        styles
      }
    }
  }
`

const CREATE_BEER = gql`
  mutation CreateBeer($input: Beer_CreateBeerInput) {
    beer {
      createBeer(input: $input)
    }
  }
`

const NewBeer = () => {
  const [beerProps, setBeerProps] = useState<IBeerProps>({
    alcohol: 0,
    breweryName: '',
    name: '',
    city: '',
    country: '',
    hops: [],
    imageUrl: '',
    state: '',
    style: '',
    type: ''
  })

  const { isLarge } = useCustomTheme()
  const navigate = useNavigate()
  const direction = isLarge ? 'row' : 'column'

  const { data } = useQuery<IQuery>(NEW_BEER_QUERY)

  const [createBeer] = useMutation(CREATE_BEER)

  const handlePropChange = (key: string, value: any | null) => {
    setBeerProps({ ...beerProps, [key]: value })
  }

  useEffect(() => {
    if (beerProps.breweryName) {
      console.log(beerProps)
      const brewery = data?.beer.breweries.find(
        x => x.name === beerProps.breweryName
      )
      if (brewery) {
        setBeerProps({
          ...beerProps,
          city: brewery.city,
          country: brewery.country,
          state: brewery.state
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beerProps.breweryName])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const id = uuid()
    createBeer({
      variables: {
        input: { ...beerProps, id }
      },
      onCompleted: () => navigate(`../beers/${id}`, { replace: true })
    })
  }

  return (
    <ContentContainer maxWidth='md'>
      <Typography variant='h2'>Create new beer</Typography>
      <Typography>
        Make sure you have tried searching for the beer before adding it.
      </Typography>
      <form onSubmit={e => handleSubmit(e)}>
        <Stack spacing={2} marginY={4}>
          <Stack direction={direction} spacing={2}>
            <TextField
              fullWidth
              required
              label='Name'
              value={beerProps.name}
              onChange={e => handlePropChange('name', e.target.value)}
            />
            <CustomAutoComplete
              required
              label='Brewery name'
              onChange={v => handlePropChange('breweryName', v)}
              options={data?.beer.breweries.map(x => x.name) || []}
              value={beerProps.breweryName}
            />
          </Stack>
          <Stack direction={direction} spacing={2}>
            <TextField
              fullWidth
              required
              label='City'
              value={beerProps.city}
              onChange={e => handlePropChange('city', e.target.value)}
            />
            <TextField
              fullWidth
              label='State'
              value={beerProps.state}
              onChange={e => handlePropChange('state', e.target.value)}
            />
            <TextField
              fullWidth
              required
              label='Country'
              value={beerProps.country}
              onChange={e => handlePropChange('country', e.target.value)}
            />
          </Stack>
          <Stack direction={direction} spacing={2}>
            <CustomAutoComplete
              label='Type'
              onChange={v => handlePropChange('type', v)}
              options={data?.beer.beerTypes.map(x => x.id) || []}
              value={beerProps.type}
            />
            <CustomAutoComplete
              label='Style'
              onChange={v => handlePropChange('style', v)}
              options={
                data?.beer.beerTypes
                  .find(({ id }) => id === beerProps.type)
                  ?.styles.map(x => x) || []
              }
              value={beerProps.style}
            />
            <TextField
              fullWidth
              required
              onChange={e =>
                handlePropChange('alcohol', parseFloat(e.target.value))
              }
              inputProps={{
                min: 0,
                max: 50,
                step: 0.1
              }}
              value={beerProps.alcohol}
              label='Alcohol'
              type='number'
            />
          </Stack>
          <CustomAutoComplete
            multiple
            label='Hops'
            onChange={v => handlePropChange('hops', v)}
            options={data?.beer.hops.map(x => x) || []}
            value={beerProps.hops}
          />
          <TextField
            fullWidth
            label='Image'
            value={beerProps.imageUrl}
            onChange={e => handlePropChange('imageUrl', e.target.value)}
          />
          <Button variant='outlined' sx={{ alignSelf: 'center' }} type='submit'>
            Submit new beer
          </Button>
        </Stack>
      </form>
    </ContentContainer>
  )
}

export default NewBeer

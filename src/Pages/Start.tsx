import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Button } from '@material-ui/core'
import React from 'react'
import { IBeerQuery } from '../Interfaces/IBeerQuery'

const BEER_QUERY = gql`
  query {
    beer {
      beersQuery {
        id
        name
        type
        alcohol
        likes
        containers{
          type
          volume
          price
          systemetNumber
        }
      }
    }
  }
`

const CREATE_BEER = gql`
  mutation {
    beer {
      createBeer(
        input: {
          name: "TestBeer"
          breweryName: "Hello Brewsky"
          type: "IPA"
          alcohol: 5
        }
      )
    }
  }
`

const Start = () => {
  const [getBeers, { data }] = useLazyQuery<IBeerQuery>(BEER_QUERY)
  const [createBeer] = useMutation(CREATE_BEER)

  return (
    <div>
      <Button onClick={() => createBeer()}>Create beer</Button>
      <Button onClick={() => getBeers()}>Get beers</Button>

      {data?.beer.beersQuery.map((x, i) => {
        return <div key={i}>{x.type}</div>
      })}
    </div>
  )
}

export default Start

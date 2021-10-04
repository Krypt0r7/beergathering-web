import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Button } from '@material-ui/core'
import React from 'react'

const BEER_QUERY = gql`
  query {
    beer {
      beers {
        name
        breweryName
        type
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
        breweryName: "Hello Brew"
        type: "IPA"
        alcohol: 5
      }
    ) {
      success
      message
    }
  }
}

`

const Start = () => {
  const [getBeers, { data }] = useLazyQuery(BEER_QUERY)
  const [createBeer] = useMutation(CREATE_BEER)

  return (
    <div>
      <Button onClick={() => createBeer()} >Create beer</Button>
      <Button onClick={() => getBeers()} >Get beers</Button>

      {data?.beer.beers.map((x, i) => {
        return <div key={i}>{x.name}</div>
      })}
    </div>
  )
}

export default Start

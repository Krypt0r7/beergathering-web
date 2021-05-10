import { gql, useQuery } from '@apollo/client'
import React from 'react'

const useBeerQuery = () => {
  return useQuery(gql`
    query {
      getBeers {
        alcohol
        brewery
        name
      }
    }
  `)
}

const Start = () => {
  const { data } = useBeerQuery()

  return (
    <div>
      {data?.getBeers.map((x, i) => {
        return <div key={i}>{x.name}</div>
      })}
    </div>
  )
}

export default Start

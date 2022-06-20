import { Container } from '@mui/material'
import React from 'react'
import Section from '../Components/Section'
import TopImage from '../Components/TopImage'
import TopList from '../Components/TopList'

const Start = () => {
  return (
    <React.Fragment>
      <TopImage imageUrl='https://s3.eu-north-1.amazonaws.com/images.beergathering/beer-tap.webp' />
      <Container disableGutters maxWidth='lg'>
        <Section>
          <TopList
            name='Reccently rated'
            beerList={[
              { name: 'Test r', alcohol: 6 },
              { name: 'Beer for schizzel', alcohol: 5 }
            ]}
          />
          <TopList
            name='Highest rated'
            beerList={[
              { name: 'Test r', alcohol: 6 },
              { name: 'Beer for schizzel', alcohol: 5 }
            ]}
          />
          <TopList
            name='Most liked'
            beerList={[
              { name: 'Test r', alcohol: 6 },
              { name: 'Beer for schizzel', alcohol: 5 }
            ]}
          />
        </Section>
      </Container>
    </React.Fragment>
  )
}

export default Start

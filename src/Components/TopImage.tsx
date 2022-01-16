import { Typography, Box } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

interface ITopImageProps {
  imageUrl: string
}

const StyledImage = styled.div<{ imageUrl: string }>`
  background-image: url( ${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 70vh;
  max-width: 1920px;
  margin-bottom: 2em;
  margin-left: auto;
  margin-right: auto;
`

const TopImage = ({ imageUrl }: ITopImageProps) => {
  return (
    <StyledImage imageUrl={imageUrl} >
      <Box height="100%" display="flex" justifyContent="center" alignItems="center" >
        <Typography textAlign="center" variant='h1'>This is start, welcome to Beer Gathering</Typography>
      </Box>
    </StyledImage>
  )
}

export default TopImage


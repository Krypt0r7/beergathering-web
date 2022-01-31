import { Box } from '@mui/material'
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

const StyledH1 = styled.h1`
  text-align: center;
  color: #fff;
  text-shadow: .5px .5px #333;
`

const TopImage = ({ imageUrl }: ITopImageProps) => (
  <StyledImage imageUrl={imageUrl} >
    <Box height="100%" display="flex" justifyContent="center" alignItems="center" marginX={1} >
      <StyledH1>This is start, welcome to Beer Gathering</StyledH1>
    </Box>
  </StyledImage>
)


export default TopImage


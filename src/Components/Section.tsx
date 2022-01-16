import { Box } from '@mui/material'
import React from 'react'

interface ISectionProps {
  children: React.ReactNode
}

const Section = ({ children }: ISectionProps) => {

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
      {children}
    </Box>
  )
}

export default Section
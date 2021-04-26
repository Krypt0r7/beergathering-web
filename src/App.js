import React from 'react'
import { CssBaseline, Paper, Typography } from '@material-ui/core'
import Header from './Components/Header'
import { ThemeProvider } from './Contexts/ThemeContext'

const App = () => {
  
  return (
   <>
    <ThemeProvider>
      <Header />
      <CssBaseline />
      <Paper>
        <Typography>Developing...</Typography>
      </Paper>
    </ThemeProvider>
   </>
  )
}

export default App

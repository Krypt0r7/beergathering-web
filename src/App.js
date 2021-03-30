import React from 'react'
import { ThemeProvider } from './Contexts/ThemeContext'
import ContentContainer from './Components/ContentContainer'
import TopBar from './Components/TopBar'
import Theme from './Theme'

const App = () => {
  return (
   <>
    <ThemeProvider>
      <Theme>
        <TopBar />
        <ContentContainer>
          <h1>Developing...</h1>
        </ContentContainer>
      </Theme>
    </ThemeProvider>
   </>
  )
}

export default App

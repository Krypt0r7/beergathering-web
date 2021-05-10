import React from 'react'
import { CssBaseline } from '@material-ui/core'
import Header from './Components/Header'
import { ThemeProvider } from './Contexts/ThemeContext'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Start from './Pages/Start'

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Header />
          <CssBaseline />
          <Switch>
            <Route path='/'>
              <Start />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App

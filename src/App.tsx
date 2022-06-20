import React, { useEffect, useState } from 'react'
import { CssBaseline } from '@mui/material'
import Header from './Components/Header'
import { ThemeProvider } from './Contexts/ThemeContext'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { PrivateRoute } from './Components/PrivateRoute'
import Start from './Pages/Start'
import Search from './Pages/Search'
import Lists from './Pages/Lists'
import Beer from './Pages/Beer'
import Beers from './Pages/Beers'
import NewBeer from './Pages/NewBeer'

const App = () => {
  const [token, setToken] = useState('')
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0()

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URI
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })

  useEffect(() => {
    async function getToken () {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE
      })
      setToken(accessToken)
    }

    if (!isLoading && isAuthenticated) {
      getToken()
    }
  }, [getAccessTokenSilently, isAuthenticated, isLoading])

  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <CssBaseline />
          <Routes>
            <Route element={<Start />} path='/' />
            <Route
              element={<PrivateRoute component={Search} />}
              path='/search'
            />
            <Route element={<PrivateRoute component={Beers} />} path='/beers' />
            <Route
              element={<PrivateRoute component={Beer} />}
              path='/beers/:beerId'
            />
            <Route
              element={<PrivateRoute component={NewBeer} />}
              path='/beers/new'
            />
            <Route element={<PrivateRoute component={Lists} />} path='/lists' />
          </Routes>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App

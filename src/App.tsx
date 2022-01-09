import React, { useEffect, useState } from 'react'
import { CssBaseline } from '@mui/material'
import Header from './Components/Header'
import { ThemeProvider } from './Contexts/ThemeContext'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Start from './Pages/Start'
import {
  useAuth0
} from '@auth0/auth0-react'
import PrivateRoute from './Components/PrivateRoute'
import Search from './Pages/Search'

const App = () => {
  const [token, setToken] = useState("")
  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
  } = useAuth0()

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URI,
  });


  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })

  useEffect(() => {
    async function getToken() {
      const accesstoken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      })
      setToken(accesstoken)
    }

    if (!isLoading && isAuthenticated) {
      getToken()
    }
    // eslint-disable-next-line
  }, [getAccessTokenSilently, isAuthenticated, isLoading])

  return (
    <>
      <ThemeProvider>
        <ApolloProvider client={client}>
          <Header />
          <CssBaseline />
          <Router>
            <Switch>
              <Route exact path='/' component={Start} />
              <PrivateRoute component={Search} path="/search" />
            </Switch>
          </Router>
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default App

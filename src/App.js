import React, { useEffect } from 'react'
import { CssBaseline } from '@material-ui/core'
import Header from './Components/Header'
import { ThemeProvider } from './Contexts/ThemeContext'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Start from './Pages/Start'
import {
  useAuth0
} from '@auth0/auth0-react'
import { useLocalStorage } from './Hooks/useLocalStorage'

// const ProtectedRoute = ({ component, ...args }) => (
//   <Route component={withAuthenticationRequired(component)} {...args} />
// )

// const onRedirectCallback = appState => {
//   // Use the router's history module to replace the url
//   // history.replace(appState?.returnTo || window.location.pathname)
// }

const App = () => {
  const [token, setToken] = useLocalStorage("token", null)
  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    loginWithRedirect
  } = useAuth0()
  
  const authLink = setContext((_, {headers} ) => {
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
    async function getToken () {
      const accesstoken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      })
      setToken(accesstoken)
    }

    if (!isLoading) {
      if (!isAuthenticated) {
        loginWithRedirect()
      } else {
        getToken()
      }
    }
    // eslint-disable-next-line
  }, [getAccessTokenSilently, isAuthenticated, isLoading])

  return (
    <>
      <ThemeProvider>
          <ApolloProvider client={client}>
            <Router>
              <Header />
              <CssBaseline />
              <Switch>
                <Route path='/'>
                  <Start />
                </Route>
              </Switch>
            </Router>
          </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default App

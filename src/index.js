import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink} from '@apollo/client'
import AuthProvider from './auth/AuthProvider'

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors'
  }
})


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.querySelector('#root')
)


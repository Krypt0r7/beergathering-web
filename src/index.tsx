import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history'

const rootElement = document.getElementById('root')
if (rootElement === null) throw new Error('Root element missing')

const root = ReactDOM.createRoot(rootElement as HTMLElement)
root.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>
)

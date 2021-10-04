import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENTID
const audience = process.env.REACT_APP_AUTH0_AUDIENCE

console.log(domain, audience, clientId);

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={window.location.origin}
          audience={audience}
          // scope="read:current_user read:app_metadata update:current_user_metadata read:beers"
        >
    <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.querySelector('#root')
)

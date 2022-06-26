import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

type Props = {
  children: JSX.Element[] | JSX.Element
}

const Auth0ProviderWithHistory = ({ children }: Props) => {
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE || ''
  const domain = process.env.REACT_APP_AUTH0_DOMAIN || ''
  const clientId = process.env.REACT_APP_AUTH0_CLIENTID || ''

  const navigate = useNavigate()

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory

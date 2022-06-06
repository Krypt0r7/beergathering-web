import { withAuthenticationRequired } from '@auth0/auth0-react'
import React, { ComponentType } from 'react'

interface PrivateRouteParams {
  component: ComponentType
}

export const PrivateRoute: React.FC<PrivateRouteParams> = ({ component }) => {
  const Component = withAuthenticationRequired(component)
  return <Component />
}

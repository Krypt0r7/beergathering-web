import { withAuthenticationRequired } from '@auth0/auth0-react'
import React, { FC } from 'react'
import { Route } from 'react-router-dom'

interface IPrivateRouteParams {
  component: FC,
  path: string
}

const PrivateRoute = ({ component, path, ...args }: IPrivateRouteParams) => (
  <Route
    component={withAuthenticationRequired(component)}
    path={path}
    {...args}
  />
)

export default PrivateRoute
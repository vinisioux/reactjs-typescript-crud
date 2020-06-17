import React, { useContext } from 'react';
import {
  RouteProps as ReactDOMRouterProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { AuthContext } from '../context/auth';

interface RouteProps extends ReactDOMRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === !!user.email ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/' : '/users' }} />
        );
      }}
    />
  );
};

export default Route;

import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  return (
    <Route
      {...rest}
      render={props =>
        authToken ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/sign-in" />
        )
      }
    />
  );
};

export default PrivateRoute;
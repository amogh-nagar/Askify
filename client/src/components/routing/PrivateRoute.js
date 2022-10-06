import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({
  component: Component,
  
  ...rest
}) => {
  const state=useSelector(state=>state.auth)

  return <Route
    {...rest}
    render={(props) =>
      !state.isAuthenticated && !state.loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
  };


export default PrivateRoute;

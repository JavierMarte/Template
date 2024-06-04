import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';


export const Layout = () => {



  return (
    <React.Fragment>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />

        <Route path={`/admin`} component={AdminLayout}/>

      </Switch>
    </React.Fragment>
  );
};

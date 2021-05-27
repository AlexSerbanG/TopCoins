import * as React from 'react';
import { Redirect, Route, Switch } from "react-router"
import { routes } from '../routes';

export const Routes = () => (
  <Switch>
    {routes.map(({ label, path, component, exact, }) =>
      <Route key={label} path={path} exact={exact} component={component}/>
    )}
    <Redirect to="/"/>
  </Switch>
);

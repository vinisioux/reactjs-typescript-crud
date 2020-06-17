import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import ListUsers from '../pages/ListUsers';
import FormUsers from '../pages/FormUsers';
import UpdateUser from '../pages/UpdateUser';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />

    <Route path="/users" component={ListUsers} isPrivate />
    <Route path="/register-user" component={FormUsers} isPrivate />
    <Route path="/update-user/:id" component={UpdateUser} isPrivate />
  </Switch>
);

export default Routes;

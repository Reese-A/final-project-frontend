import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Main = props => {
  return (
    <main id="main">
      MAIN
      <Switch>{/* <Route exact path="/" component={Home} /> */}</Switch>
    </main>
  );
};

export default Main;

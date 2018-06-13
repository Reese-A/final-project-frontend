import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Camera from '../Camera/Camera';
import NoMatch from '../NoMatch/NoMatch';
import Registration from '../Registration/Registration';

import './Main.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }

  render() {
    return (
      <main id="main">
        <Switch>
          <Route exact path="/camera" component={Camera} />
          <Route exact path="/register" component={Registration} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    );
  }
}

export default Main;

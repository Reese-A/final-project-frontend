import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Camera from '../Camera/Camera';
import NoMatch from '../NoMatch/NoMatch';

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
          <Route component={NoMatch} />
        </Switch>
      </main>
    );
  }
}

export default Main;

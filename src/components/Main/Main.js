import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../Home/Home';
import Camera from '../Camera/Camera';
import NoMatch from '../NoMatch/NoMatch';
import Registration from '../Registration/Registration';
import Dashboard from '../../containers/Dashboard/Dashboard';
import SearchForm from '../SearchForm/SearchForm';
import AddFood from '../AddFood/AddFood';

import './Main.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <main id="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/camera" component={Camera} />
          <Route exact path="/add/camera" component={Camera} />
          <Route exact path="/add/search" component={SearchForm} />
          <Route exact path="/add" component={AddFood} />

          <Route exact path="/register" component={Registration} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    );
  }
}

export default Main;

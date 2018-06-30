import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home/Home';
import NoMatch from '../NoMatch/NoMatch';
import Registration from '../Registration/Registration';
import Dashboard from '../../containers/Dashboard/Dashboard';
import AddFood from '../../containers/AddFood/AddFood';
import Settings from '../../containers/Settings/Settings';
import DishDetail from '../../containers/DishDetail/DishDetail';
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
          <Route exact path="/dish/:id" component={DishDetail} />
          <Route exact path="/add" component={AddFood} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/register" component={Registration} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    );
  }
}

export default Main;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { getCaloriesExpended, getTotalSteps } from '../../redux/actions/fitness-actions';
import './App.css';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';

class App extends Component {
  componentDidMount() {
    this.props.getCaloriesExpended();
    this.props.getTotalSteps();
  }
  render() {
    return (
      <div id="app">
        <div id="app_main">
          {/* <Header /> */}
          <Main />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    // user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCaloriesExpended: () => {
      dispatch(getCaloriesExpended());
    },
    getTotalSteps: () => {
      dispatch(getTotalSteps());
    }
  }
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

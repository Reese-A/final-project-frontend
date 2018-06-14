import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import './App.css';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';

class App extends Component {
  render() {
    return (
      <div id="app">
        <div id="app_main">
          <Main />
          <Header />
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
    // loadUser: () => {
    //   dispatch(loadUser());
    // }
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

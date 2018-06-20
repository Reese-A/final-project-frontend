import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCaloriesExpended, getTotalSteps } from '../../redux/actions/fitness-actions';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import './App.css';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';

import { loadUser } from '../../redux/actions/user-actions';
class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
      user: {
        email: '',
        first_name: '',
        id: 0
      }
    };
  }
  componentDidMount() {
    this.props.getCaloriesExpended();
    this.props.getTotalSteps();
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    if (user) {
      this.setState({ user });
      this.props.loadUser(user.id);
    }
  }
  render() {
    console.log(this.props);
    if (!this.state.user && this.props.location.pathname !== '/') {
      console.log('redirect');
      // return <Redirect to="/" />;
    }
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
    },
    loadUser: id => {
      dispatch(loadUser(id));
    }
  };
};
export default withRouter(connect (mapStateToProps, mapDispatchToProps)(App));

import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadUser, logoutUser } from '../../redux/actions/user-actions';
import { loadConsumption } from '../../redux/actions/dishes-actions';
import { updateDaily } from '../../redux/actions/daily-actions';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.loadUser(this.props.user.id);
      this.props.loadConsumption();
    }
  }

  logoutHandler(event) {
   event.preventDefault();
   this.props.logoutUser();
   this.props.history.push('/');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.consumption === this.props.consumption) {
      this.props.loadConsumption();
    }
    this.props.updateDaily(this.props.consumption.calories);
  }

  render() {
    console.log('header match', this.props.match);
    const consumption = this.props.consumption.calories
      ? this.props.consumption.calories
      : 0;

    return (
      <header id="header">
        <div id="header_logo">
          <NavLink to="/">FitByte</NavLink>
        </div>
        {this.props.user ? (
          <div id="header_allowance">
            <span id="header_allowance_value">
              {`${this.props.user.allowance - consumption}`}
            </span>
            <span id="header_allowance_units"> cal</span>
          </div>
        ) : null}
        {this.props.match.path === '/dashboard' ? (
          <div id="logoutWrap">
            <button id="logout" onClick={this.logoutHandler}> Logout </button>
          </div>
        ) : (
            <NavLink to="/dashboard">
              <i className="material-icons">account_circle</i>
            </NavLink>
          )}

      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    consumption: state.consumption
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: id => {
      dispatch(loadUser(id));
    },
    logoutUser: () => {
      dispatch(logoutUser());
    },
    loadConsumption: () => {
      dispatch(loadConsumption());
    },
    updateDaily: calories => {
      dispatch(updateDaily(calories));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);

import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadUser } from '../../redux/actions/user-actions';
import { loadConsumption } from '../../redux/actions/dishes-actions';
import { updateDaily } from '../../redux/actions/daily-actions';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.loadUser(this.props.user.id);
      this.props.loadConsumption();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.consumption === this.props.consumption) {
      this.props.loadConsumption();
    }
    this.props.updateDaily(this.props.consumption.calories);
  }

  render() {
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
              {this.props.user.allowance - consumption}
            </span>
            <span id="header_allowance_units"> cal</span>
          </div>
        ) : null}

        <NavLink to="/dashboard">
          <i className="material-icons">account_circle</i>
        </NavLink>
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

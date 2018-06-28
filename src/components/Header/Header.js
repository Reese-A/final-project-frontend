import React, { Component } from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadUser, logoutUser } from '../../redux/actions/user-actions';
import { loadConsumption } from '../../redux/actions/dishes-actions';
import { updateDaily } from '../../redux/actions/daily-actions';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
    this.logoutHandler = this.logoutHandler.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
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

  toggleMenu(event) {
    this.setState({ showMenu: !this.state.showMenu });
  }

  hideMenu(event) {
    this.setState({ showMenu: false });
  }

  logoutHandler(event) {
    event.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/');
  }

  render() {
    console.log('header match', this.props.match);
    const consumption = this.props.consumption.calories
      ? this.props.consumption.calories
      : 0;

    return (
      <header id="header">
        <div id="header_logo">
          <NavLink to="/dashboard">FitByte</NavLink>
        </div>
        {this.props.user ? (
          <div id="header_allowance">
            <span id="header_allowance_value">
              {`${this.props.user.allowance - consumption}`}{' '}
              <span id="header_allowance_units"> cal</span>
            </span>
          </div>
        ) : null}
        <div id="header_account_button">
          <i className="material-icons" onClick={this.toggleMenu}>
            account_circle
          </i>
        </div>
        <div
          id="header_menu"
          className={`${this.state.showMenu ? 'show' : null}`}
          onClick={this.toggleMenu}
        >
          <div id="menu_option_profile" className="menu_option">
            <Link to="/settings">
              <span className="menu_option_text">Profile</span>
            </Link>
          </div>
          <div className="menu_seperator" />
          <div
            id="menu_option_logout"
            className="menu_option"
            onClick={this.logoutHandler}
          >
            <span className="menu_option_text">Logout</span>
          </div>
        </div>
        <div
          id="header_menu_background"
          className={`${this.state.showMenu ? 'show' : null}`}
          onClick={this.hideMenu}
        />
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

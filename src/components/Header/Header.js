import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadUser } from '../../redux/actions/user-actions';
import { loadConsumption } from '../../redux/actions/dishes-actions';

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
  }

  render() {
    const consumption = this.props.consumption.calories
      ? this.props.consumption.calories
      : 0;
    return (
      <header id="header">
        {this.props.user ? (
          <div id="username">Welcome, {this.props.user.first_name}!</div>
        ) : null}
        {this.props.user ? (
          <div id="allowance">
            You have {this.props.user.allowance - consumption} calories left to
            consume!
          </div>
        ) : null}
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
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);

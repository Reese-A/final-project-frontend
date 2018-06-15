import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadUser } from '../../redux/actions/user-actions';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadUser(3);
  }

  render() {
    return (
      <header id="header">
        {
          this.props.user.user
            ? <div id="username">Welcome, {this.props.user.user.first_name}!</div>
            : null
        }
        <div id="allowance">{this.props.user.allowance}</div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: (id) => {
      dispatch(loadUser(id));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);

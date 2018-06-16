import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    console.log(this.props.user);
  }
  render() {
    return (
      <header id="header">
        {
          this.props.user
            ? <div id="username">Welcome, {this.props.user.first_name}!</div>
            : null
        }
        {
          this.props.user
            ? <div id="allowance">You have {this.props.user.allowance} calories left to consume!</div>
            : null
        }
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Header)
);

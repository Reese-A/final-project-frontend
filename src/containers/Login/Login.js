import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginUser } from '../../redux/actions/user-actions';

import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginError: ''
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  render() {
    return (
      <div id="login">
        <form onSubmit={this.submitHandler} className="registrationForm">
          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={this.changeHandler}
              autoFocus
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={this.changeHandler}
            />
          </div>

          <button type="submit">Login</button>
          {this.props.user.err ? (
            <div id="loginError">{this.props.user.err}</div>
          ) : null}
        </form>
      </div>
    );
  }

  changeHandler(event) {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  }

  submitHandler(event) {
    event.preventDefault();

    this.props.loginUser(this.state, this.props.history);
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (user, history) => {
      dispatch(loginUser(user, history));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);

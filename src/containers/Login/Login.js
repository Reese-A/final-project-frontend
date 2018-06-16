import React from 'react';

import { connect } from 'react-redux';

import { loginUser } from '../../redux/actions/user-actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  render() {
    return (
      <div id="login">
        <form onSubmit={this.submitHandler}>

          <div className="formGroup">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={this.changeHandler}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password: </label>
            <input
              type="text"
              name="password"
              id="password"
              onChange={this.changeHandler}
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  changeHandler(event) {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  }

  submitHandler(event) {
    console.log(this.state);
    event.preventDefault();

    this.props.loginUser(this.state);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => {
      dispatch(loginUser(user));
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);
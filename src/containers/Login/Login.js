import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.submitHandler = this.submitHandler.bind(this);
  }

  render() {
    return (
      <div id="login">
        <form onSubmit={this.submitHandler}>

          <div className="formGroup">
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" id="email" />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password: </label>
            <input type="text" name="password" id="password" />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  submitHandler(event) {
    //submit some shit
  }
}
export default Login;
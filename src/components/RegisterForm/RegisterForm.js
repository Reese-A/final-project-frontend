import React from 'react';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirm: '',
      firstName: '',
      lastName: '',
      hideErr: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);

  }
  
  changeHandler(event) {
      const { value, name } = event.target;
      if(name === "confirm") {
        if(value === this.state.password){
          this.setState({ hideErr: true })
        } else {
          this.setState({ hideErr: false })
        }
      }
      this.setState({ [name]:value })
    };

  handleSubmit(event){
    event.preventDefault();
    if(this.state.password !== this.state.confirm) {
      return this.setState({
        hideErr: false
      })
    } else {
      this.props.nextPage();
    }
  };

  render() {
    return (
        <form id="register_form" onSubmit={this.handleSubmit}>
        <div id="register_form_title">Register new user</div>
          <input
           type="email" 
           id="register_email"
           name="email" 
           placeholder="Email"
           required
           value={this.state.email}
           onChange={this.changeHandler}
           />
           <br/>
           <input 
           type="password"
           id="register_password"
           name="password"
           placeholder="Password"
           required
           value={this.state.password}
           onChange={this.changeHandler}
           />
           <br/>

           <input
            type="password"
            id="register_confirm"
            name="confirm"
            placeholder="Confirm password"
            required
            value={this.state.confirm}
            onChange={this.changeHandler}
            />
            <br/>

            <input 
            type="text"
            id="register_first_name"
            name="firstName"
            placeholder="First name"
            required
            value={this.state.firstName}
            onChange={this.changeHandler}
            />
            <br/>

            <input 
            type="text"
            id="register_last_name"
            name="lastName"
            placeholder="Last name"
            required
            value={this.state.lastName}
            onChange={this.changeHandler}
            />
            <br/>

            <div hidden={this.state.hideErr}>Passwords must match</div>

          <button type="submit">Next</button>
        </form>
    )
  }
}

export default RegisterForm;
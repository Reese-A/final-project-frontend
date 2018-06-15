import React from 'react';
import { connect } from 'react-redux';
import { saveAccountForm, } from '../../redux/actions/account-form-actions';
import { loadGenders } from '../../redux/actions/gender-actions';
import { loadGoals } from '../../redux/actions/goal-actions';
import { loadActivityLevels } from '../../redux/actions/activity-level-actions';

class AccountForm extends React.Component {
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
    if (name === "confirm") {
      if (value === this.state.password) {
        this.setState({ hideErr: true });
      } else {
        this.setState({ hideErr: false });
      }
    };
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.props.loadGenders();
    this.props.loadGoals();
    this.props.loadActivityLevels();
    this.setState({ ...this.props.accountForm });
  }

  static getDerivedStateFromProps(props, state) {
    if(state) {
      console.log(state);
    }
    if (props) {
      console.log(props);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps){
      console.log(prevProps);
    }
    if(prevState) {
      console.log(prevState);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirm) {
      return this.setState({
        hideErr: false
      });
    } else {
      this.props.saveAccountForm({ ...this.state });
      this.props.nextPage();
    }
  };

  render() {
    return (

      <div id="account_form">
        <div id="account_form_title">Register new user</div>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <div id="email_container">
            <span>Email address:</span>
            <input
              type="email"
              id="account_email"
              name="email"
              placeholder="Email"
              required
              value={this.state.email}
              onChange={this.changeHandler}
            />
          </div>
          <br />
          <div id="password_container">
            <span>Password:</span>
            <input
              type="password"
              id="account_password"
              name="password"
              placeholder="Password"
              required
              value={this.state.password}
              onChange={this.changeHandler}
            />
          </div>
          <br />
          <div id="span_container">
            <span>Confirm password:</span>
            <input
              type="password"
              id="account_confirm"
              name="confirm"
              placeholder="Confirm password"
              required
              value={this.state.confirm}
              onChange={this.changeHandler}
            />
          </div>
          <br />
          <div id="first_name_container">
            <span>First name:</span>
            <input
              type="text"
              id="account_first_name"
              name="firstName"
              placeholder="First name"
              required
              value={this.state.firstName}
              onChange={this.changeHandler}
            />
          </div>
          <br />

          <div id="last_name_container">
            <span>Last name:</span>
            <input
              type="text"
              id="account_last_name"
              name="lastName"
              placeholder="Last name"
              required
              value={this.state.lastName}
              onChange={this.changeHandler}
            />
          </div>
          <br />

          <div hidden={this.state.hideErr}>Passwords must match</div>
          <br/>
          <button type="submit">Next</button>
        </form>
      </div>
    )
  };
};

const mapStateToProps = state => {
  return {
    accountForm: state.registrationForm.accountForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveAccountForm: (form) => {
      dispatch(saveAccountForm(form));
    },
    loadGenders: () => {
      dispatch(loadGenders());
    },
    loadGoals: () => {
      dispatch(loadGoals());
    },
    loadActivityLevels: () => {
      dispatch(loadActivityLevels());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);
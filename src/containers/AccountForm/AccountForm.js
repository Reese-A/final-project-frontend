import React from 'react';
import { connect } from 'react-redux';
import { saveAccountForm, } from '../../redux/actions/account-form-actions';
import { loadGenders } from '../../redux/actions/gender-actions';
import { loadGoals } from '../../redux/actions/goal-actions';
import { loadActivityLevels } from '../../redux/actions/activity-level-actions';

import './AccountForm.css';
class AccountForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirm: '',
      first_name: '',
      last_name: '',
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
      <div id="accountForm">

        <div id="accountFormImage">
          <div className="homeTitle">fitbyte</div>
        </div>

        <div className="formModal">

          <form className="registrationForm" onSubmit={this.handleSubmit}>

            <div className="formGroup">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={this.state.email}
                onChange={this.changeHandler}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                value={this.state.password}
                onChange={this.changeHandler}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="confirm">Confirm Password:</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                required
                value={this.state.confirm}
                onChange={this.changeHandler}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                value={this.state.first_name}
                onChange={this.changeHandler}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                value={this.state.last_name}
                onChange={this.changeHandler}
              />
            </div>

            <div hidden={this.state.hideErr}>Passwords must match</div>

            <button type="submit">Next</button>

          </form>
        </div>
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
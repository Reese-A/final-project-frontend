import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { loginGoogle } from '../../redux/actions/settings-actions';
import { loadGenders } from '../../redux/actions/gender-actions';
import { loadGoals } from '../../redux/actions/goal-actions';
import { loadActivityLevels } from '../../redux/actions/activity-level-actions';
import { GoogleLogin } from 'react-google-login'
import UpdateProfileForm from '../UpdateProfileForm/UpdateProfileForm';

import './Settings.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.loading = this.loading.bind(this);
  }

  componentDidMount() {
    this.props.loadGenders();
    this.props.loadGoals();
    this.props.loadActivityLevels();
  }

  success(res) {
    this.props.loginGoogle(res);
  }

  error = res => {
    console.error(res)
  }

  loading = () => {
    console.log('loading')
  }


  render() {
    return (
      <div id="settingsWrap">
        <div id="settingsTitle">Settings</div>
        <UpdateProfileForm />
        <GoogleLogin
          clientId="754246514774-ei1kjc8cujnegap63tdedbg4qa6l48el.apps.googleusercontent.com"
          scope="https://www.googleapis.com/auth/fitness.activity.read"
          onSuccess={this.success}
          onFailure={this.error}
          onRequest={this.loading}
          offline={false}
          approvalPrompt="force"
          responseType="id_token"
          isSignedIn
        // disabled
        // prompt="consent"
        // className='button'
        // style={{ color: 'red' }}
        >
          <span>Connect Google Fit account</span>
        </GoogleLogin>
        <NavLink to="/dashboard" id="dashboardLink">Back to Dashboard</NavLink>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginGoogle: (auth) => {
      dispatch(loginGoogle(auth));
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
}

export default withRouter(connect(null, mapDispatchToProps)(Settings));
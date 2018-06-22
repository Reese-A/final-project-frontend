import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { loginGoogle } from '../../redux/actions/settings-actions';
import { loadGenders } from '../../redux/actions/gender-actions';
import { loadGoals } from '../../redux/actions/goal-actions';
import { loadActivityLevels } from '../../redux/actions/activity-level-actions';
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import UpdateProfileForm from '../UpdateProfileForm/UpdateProfileForm';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.loading = this.loading.bind(this);
  }

  success(res) {
    this.props.loadGenders();
    this.props.loadGoals();
    this.props.loadActivityLevels();
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
    <UpdateProfileForm />
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

export default connect(null, mapDispatchToProps)(Settings);
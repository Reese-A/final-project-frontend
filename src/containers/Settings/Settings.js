
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { loginGoogle } from '../../redux/actions/settings-actions';
import { GoogleLogout, GoogleLogin } from 'react-google-login'



class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.loading = this.loading.bind(this);
    this.logout = this.logout.bind(this);
  }

  success(res) {
    console.log('success test');
    console.log(res);
    this.props.loginGoogle(res);
  }

  error = res => {
    console.error(res)
  }
  
  loading = () => {
    console.log('loading')
  }
  
  logout = (data) => {
    console.log(data);
    console.log('logout')
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

    <GoogleLogout buttonText="Disconnect Google Fit" onLogoutSuccess={this.logout} />

  </div>
    )
  }
}



const mapDispatchToProps = dispatch => {
  return {
    loginGoogle: (auth) => {
      dispatch(loginGoogle(auth));
    }
  }
}

export default connect(null, mapDispatchToProps)(Settings);
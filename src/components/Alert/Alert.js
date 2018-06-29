import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import './Alert.css';

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: true
    };
    this.hideAlert = this.hideAlert.bind(this);
  }
  componentDidMount() {}

  hideAlert(event) {
    event.preventDefault();
    this.setState({ showAlert: false });
  }

  render() {
    return (
      <div id="alert" className={this.state.showAlert ? '' : 'hide'}>
        <div id="alert_header">
          <span id="alert_header_text">Hi there!</span>
          <button id="alert_header_close" onClick={this.hideAlert}>
            <i className="material-icons">close</i>
          </button>
        </div>
        <div id="alert_body">
          <div id="alert_text">
            We noticed that you're currently using a default physical profile.
            To ensure that you get the most accurate user experience possible
            from FitByte, please update your profile in Settings.
          </div>
        </div>
        <div id="alert_button">
          <NavLink to="/settings">Go to Settings</NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Alert)
);

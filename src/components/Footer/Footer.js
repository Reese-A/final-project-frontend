import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import './Footer.css';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }

  render() {

    return (
      <div id="footer">
        {this.props.user.default_profile ? (
          <div id="footer_text_wrap">
            <div id="footer_text">We noticed that you're currently using a default physical profile. To ensure that you get the most accurate user experience possible from FitByte, please update your profile in Settings. </div>
            <NavLink to="/settings">
              Go to Settings
      </NavLink>
          </div>) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps, null)(Footer));
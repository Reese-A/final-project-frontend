import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../../components/Header/Header';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.user.online) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <Header />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, null)(Dashboard);
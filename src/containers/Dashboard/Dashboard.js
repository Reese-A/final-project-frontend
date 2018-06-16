import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadUser } from '../../redux/actions/user-actions';

import Header from '../../components/Header/Header';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.loadUser(this.props.user.id);
    }
  }

  render() {
    if (!this.props.user.online) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <div id="dashboard">
        <Header />
        <div id="dashbordWrap">
          <div id="intake">
            <div id="calories">Calories Consumed: </div>
            <div id="chart">Macronutrients: </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: (id) => {
      dispatch(loadUser(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
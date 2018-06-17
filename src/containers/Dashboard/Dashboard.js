import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { loadUserDishes } from '../../redux/actions/dishes-actions';

import Header from '../../components/Header/Header';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('mount');
    this.props.loadUserDishes();
  }

  render() {
    if (!this.props.user.online) {
      return <Redirect to="/" />;
    }
    return (
      <div id="dashboard">
        <Header />
        <div id="dashboardWrap">
          <div id="intake">
            <div id="calories">Calories Consumed: </div>
            <div id="chart">Macronutrients: </div>
          </div>
          <div>
            <Link to="/add">Add</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    dishes: state.dishes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserDishes: () => {
      dispatch(loadUserDishes());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

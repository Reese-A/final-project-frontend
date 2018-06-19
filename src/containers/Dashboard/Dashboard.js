import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { loadUserDishes } from '../../redux/actions/dishes-actions';

import Header from '../../components/Header/Header';
import FoodList from '../../components/FoodList/FoodList';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadUserDishes();
    console.log(this.props.dishes);
  }

  render() {
    if (!this.props.user.online) {
      return <Redirect to="/" />;
    }
    // const totalCal = this.props.consumption.calories ?
    return (
      <div id="dashboard">
        <Header />
        <div id="dashboardWrap">
          <div id="intake">
            <div id="calories">
              Calories Consumed: {this.props.consumption.calories}
            </div>
            <div id="chart">
              Macronutrients:
              <div>Fat: {this.props.consumption.fat}g</div>
              <div>Carbs: {this.props.consumption.carb}g</div>
              <div>Protein: {this.props.consumption.protein}g</div>
            </div>
            <br />
            {Object.keys(this.props.dishes).length > 0 ? <FoodList /> : null}
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
    dishes: state.dishes,
    consumption: state.consumption
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

import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { loadUserDishes } from '../../redux/actions/dishes-actions';
import {
  getCaloriesExpended,
  getTotalSteps
} from '../../redux/actions/fitness-actions';
import GoogleFit from '../GoogleFit/GoogleFit';

import Header from '../../components/Header/Header';
import FoodList from '../../components/FoodList/FoodList';

import './Dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadUserDishes();
    this.props.getCaloriesExpended();
    this.props.getTotalSteps();
  }

  render() {
    // if (!this.props.user.online) {
    //   return <Redirect to="/" />;
    // }
    // const totalCal = this.props.consumption.calories ?
    let servings = 1;
    if (this.props.dishes[0]) {
      console.log(this.props.dishes[0].ingredients[0]['_pivot_servings']);
      servings = Number(this.props.dishes[0].ingredients[0]['_pivot_servings']);
    }
    return (
      <div id="dashboard">
        <Header />
        <div id="dashboardWrap">
          <div id="intake">
            <div id="calories">
              Calories Consumed: {this.props.consumption.calories * servings}
            </div>
            <div id="chart">
              Macronutrients:
              <div>Fat: {this.props.consumption.fat * servings}g</div>
              <div>Carbs: {this.props.consumption.carb * servings}g</div>
              <div>Protein: {this.props.consumption.protein * servings}g</div>
            </div>
            <br />
            <FoodList />
          </div>
          <div>
            <GoogleFit />
          </div>
          <div>
            <Link to="/add">Add</Link>
          </div>
          <div>
            <Link to="/settings">Settings</Link>
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
    consumption: state.consumption,
    totalSteps: state.fitness.totalSteps,
    caloriesExpended: state.fitness.caloriesExpended
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserDishes: () => {
      dispatch(loadUserDishes());
    },
    getCaloriesExpended: () => {
      dispatch(getCaloriesExpended());
    },
    getTotalSteps: () => {
      dispatch(getTotalSteps());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

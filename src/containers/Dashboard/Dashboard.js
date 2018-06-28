import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { loadUserDishes } from '../../redux/actions/dishes-actions';
import {
  getCaloriesExpended,
  getTotalSteps
} from '../../redux/actions/fitness-actions';
import { loadDaily } from '../../redux/actions/daily-actions';
import GoogleFit from '../GoogleFit/GoogleFit';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import FoodList from '../../components/FoodList/FoodList';
import CalorieChart from '../../components/CalorieChart/CalorieChart';

import './Dashboard.css';
import PieChartComponent from '../../components/PieChart/PieChart';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        google_fit: ''
      }
    };
  }

  componentDidMount() {
    this.props.loadUserDishes();
    this.props.getCaloriesExpended();
    this.props.loadDaily();
    this.props.getTotalSteps();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.user.google_fit) return state.user.google_fit;

    const stateChanges = {};

    if (props.user.google_fit) {
      props.getCaloriesExpended();
      props.getTotalSteps();
      stateChanges.google_fit = props.user.google_fit;
    }
    return stateChanges;
  }

  render() {
    let currentUser = localStorage.getItem('user');
    if (!currentUser) {
      return <Redirect to="/" />;
    }

    let macroCheck = false;
    if (
      this.props.consumption.fat &&
      this.props.consumption.carb &&
      this.props.consumption.protein
    ) {
      macroCheck = true;
    }

    return (
      <div id="dashboard">
        <Header />
        <div id="dashboard_body">
          <div id="calories">
            Calories Consumed: {this.props.consumption.calories}
            <CalorieChart />
          </div>
          {macroCheck ? (
            <div id="chart">
              <PieChartComponent consumption={this.props.consumption} />
            </div>
          ) : null}
          <br />
          <FoodList />
        </div>
        <div>
          {this.props.user.google_fit ? (
            <GoogleFit />
          ) : (
            <div id="gfit_alert">Google Fit is not enabled.</div>
          )}
        </div>
        <div>
          <Link to="/add">Add</Link>
        </div>
        <div>
          <Link to="/settings">Settings</Link>
        </div>
        <div>
          <Footer />
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
    loadDaily: () => {
      dispatch(loadDaily());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

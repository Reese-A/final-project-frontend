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
// import Footer from '../../components/Footer/Footer';
import Alert from '../../components/Alert/Alert';

import FoodList from '../../components/FoodList/FoodList';
import CalorieChart from '../../components/CalorieChart/CalorieChart';

import './Dashboard.css';
import PieChartComponent from '../../components/PieChart/PieChart';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: 'line',
      user: {
        google_fit: ''
      }
    };

    this.toggleChart = this.toggleChart.bind(this);
    this.routeToDish = this.routeToDish.bind(this);
  }

  toggleChart() {
    if (this.state.chart === 'line') {
      return this.setState({
        chart: 'pie'
      });
    }
    return this.setState({
      chart: 'line'
    });
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

  routeToDish(event, id) {
    console.log(this.props);
    this.props.history.push(`/dish/${id}`);
  }

  render() {
    let currentUser = localStorage.getItem('user');
    if (!currentUser) {
      return <Redirect to="/" />;
    }

    let macroCheck = false;
    if (
      this.props.consumption.fat ||
      this.props.consumption.carb ||
      this.props.consumption.protein
    ) {
      macroCheck = true;
    }
    return (
      <div id="dashboard">
        <Header />
        {this.props.user.default_profile ? <Alert /> : null}

        <div id="dashboard_body">
          <div id="calories">
            <div id="calories_consumed">
              Calories Consumed: {this.props.consumption.calories}
            </div>
            {this.state.chart === 'line' ? <CalorieChart /> : null}
          </div>
          {this.state.chart === 'pie' && macroCheck ? (
            <div id="chart">
              <PieChartComponent consumption={this.props.consumption} />
            </div>
          ) : null}
          <button id="chart_toggle" onClick={this.toggleChart}>
            Switch Charts
          </button>

          <div className="horizontal_seperator" />
          <FoodList routeToDish={this.routeToDish} />
        </div>

        <div id="add_meal_button">
          <Link to="/add">
            <span id="add_meal_text">Add</span>
          </Link>
        </div>
        <div>
          {this.props.user.google_fit ? (
            <GoogleFit />
          ) : (
            <div id="gfit_alert">Google Fit is not enabled.</div>
          )}
        </div>

        {/* <div>
          <Link to="/settings">Settings</Link>
        </div> */}
        {/* <div>
          <Footer />
        </div> */}
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

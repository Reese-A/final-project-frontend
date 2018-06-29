import React from 'react';
import { connect } from 'react-redux';
import './FoodList.css';

import moment from 'moment-timezone';

// const meals = ['all', 'breakfast', 'lunch', 'dinner'];
const meals = {
  all: { value: 'all', prev: null, next: 'breakfast' },
  breakfast: { value: 'breakfast', prev: 'all', next: 'lunch' },
  lunch: { value: 'lunch', prev: 'breakfast', next: 'dinner' },
  dinner: { value: 'dinner', prev: 'lunch', next: null }
};

class FoodList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: {
        all: { calories: 0, dishes: {} },
        breakfast: { calories: 0, dishes: {} },
        lunch: { calories: 0, dishes: {} },
        dinner: { calories: 0, dishes: {} },
        ready: false
      },
      meal: meals['all']
    };

    this.handleFilterAll = this.handleFilterAll.bind(this);
    this.handleFilterPrev = this.handleFilterPrev.bind(this);
    this.handleFilterNext = this.handleFilterNext.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.dishes.length) return;
    if (!this.state.meals.ready) {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const startOfDay = moment()
        .tz(timeZone)
        .startOf('day')
        .format();

      const endOfDay = moment()
        .tz(timeZone)
        .endOf('day')
        .format();

      const breakfast = {
        start: startOfDay,
        end: moment()
          .tz(timeZone)
          .startOf('day')
          .hour(11)
          .minute(0)
          .format()
      };

      const lunch = {
        start: breakfast.end,
        end: moment()
          .tz(timeZone)
          .startOf('day')
          .hour(16)
          .minute(0)
          .format()
      };

      const dinner = {
        start: lunch.end,
        end: endOfDay
      };

      const meals = this.props.dishes.reduce((meals, dish) => {
        let meal = '';

        meals.all.dishes[dish.created_at] = dish;
        meals.all.calories = meals.all.calories + Number(dish.calories);

        if (moment(dish.created_at).isBetween(breakfast.start, breakfast.end)) {
          meal = 'breakfast';
        }
        if (moment(dish.created_at).isBetween(lunch.start, lunch.end)) {
          meal = 'lunch';
        }
        if (moment(dish.created_at).isBetween(dinner.start, dinner.end)) {
          meal = 'dinner';
        }
        meals[meal].dishes[dish.created_at] = dish;
        meals[meal].calories = meals[meal].calories + Number(dish.calories);
        meal = '';

        return meals;
      }, this.state.meals);
      meals.ready = true;
      this.setState({ meals }, () => {});
    }
  }

  handleFilterAll(event) {
    this.setState({ meal: meals['all'] });
  }
  handleFilterPrev(event) {
    this.setState({ meal: meals[this.state.meal.prev] });
  }
  handleFilterNext(event) {
    this.setState({ meal: meals[this.state.meal.next] });
  }

  render() {
    return (
      <div id="food_list">
        <div id="food_list_header">
          <span id="food_list_header_text">Today's Meals</span>
        </div>
        <div id="food_list_navbar">
          <button id="food_list_filter_all" onClick={this.handleFilterAll}>
            All
          </button>
          <div id="food_list_filter_meal">
            <button
              className={`${!this.state.meal.prev ? 'disabled' : null}`}
              onClick={this.handleFilterPrev}
              disabled={!this.state.meal.prev}
            >
              <i className="material-icons">chevron_left</i>
            </button>
            <span id="food_list_filter_meal_text">{this.state.meal.value}</span>
            <button
              className={`${!this.state.meal.next ? 'disabled' : null}`}
              onClick={this.handleFilterNext}
              disabled={!this.state.meal.next}
            >
              <i className="material-icons">chevron_right</i>
            </button>
          </div>
          <div id="food_list_calories">
            <span id="food_list_calories_text">
              {this.state.meals[this.state.meal.value].calories}{' '}
              <span id="food_list_calories_units">cal</span>
            </span>
          </div>
        </div>
        <div id="food_list_body">
          {this.state.meals.ready ? (
            Object.values(this.state.meals[this.state.meal.value].dishes).map(
              (dish, index) => {
                return (
                  <div className="food_list_item" key={index}>
                    <div className="item_created_at">
                      <span className="item_created_at_time">
                        {moment(dish.created_at).format('h:mm')}{' '}
                        <span className="item_created_at_period">
                          {moment(dish.created_at).format('a')}
                        </span>
                      </span>
                    </div>
                    <div className="food_list_item_body">
                      <span className="item_name">{dish.name}</span>
                      <span className="item_calories">
                        {Number(dish.calories)}{' '}
                        <span id="item_calories_units">cal</span>
                      </span>
                    </div>
                    <div className="item_button">
                      <button>
                        <i className="material-icons">more_vert</i>
                      </button>
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <div id="food_list_empty">
              <span id="empty_message">No meals added today</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dishes: state.dishes
  };
};

export default connect(
  mapStateToProps,
  null
)(FoodList);

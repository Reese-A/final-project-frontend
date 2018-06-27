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

      console.log(this.state);
      const meals = this.props.dishes.reduce((meals, dish) => {
        let meal = '';
        console.log(meals);

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
        console.log(meal);
        meals[meal].dishes[dish.created_at] = dish;
        meals[meal].calories = meals[meal].calories + Number(dish.calories);
        meal = '';

        return meals;
      }, this.state.meals);
      meals.ready = true;
      console.log(meals);
      this.setState({ meals }, () => {
        console.log(this.state);
      });
    }
  }

  handleFilterAll(event) {
    this.setState({ meal: meals['all'] });
  }
  handleFilterPrev(event) {
    console.log('prev');
    this.setState({ meal: meals[this.state.meal.prev] });
  }
  handleFilterNext(event) {
    console.log('next');
    this.setState({ meal: meals[this.state.meal.next] });
  }

  render() {
    console.log(this.state.meal.prev);
    console.log(!this.state.meal.prev);
    console.log(!!this.state.meal.prev);

    console.log(this.state.meal);
    console.log(Object.values(this.state.meals[this.state.meal.value]));
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
          {this.state.meals.ready
            ? Object.values(this.state.meals[this.state.meal.value].dishes).map(
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
            : null}
        </div>
      </div>
    );
    // console.log(this.props.dishes);
    // return (
    //   <div id="foods_list">
    //     <div id="list_title">Today's dishes</div>
    //     {this.props.dishes.length > 0 ? (
    //       this.props.dishes.map(dish => {
    //         return (
    //           <div className="dish_wrap" key={dish.id}>
    //             <div className="dish_name" key={dish.name}>
    //               {dish.name}
    //             </div>
    //             <div className="food_wrap" key={dish.id}>
    //               {dish.ingredients.map(ingredient => {
    //                 return (
    //                   <div className="ingredients_wrap" key={ingredient.id}>
    //                     <div className="ingredient_name" key={ingredient.name}>
    //                       {ingredient.name}
    //                     </div>
    //                     <div
    //                       className="ingredient_servings"
    //                       key={ingredient._pivot_servings}
    //                     >
    //                       Servings: {ingredient._pivot_servings}{' '}
    //                     </div>
    //                     <li
    //                       className="nutrients_item"
    //                       key={ingredient.calories}
    //                     >
    //                       Calories: {ingredient.calories}
    //                     </li>
    //                     <li className="nutrients_item" key={ingredient.fat}>
    //                       Fat: {ingredient.fat}g
    //                     </li>
    //                     <li className="nutrients_item" key={ingredient.carb}>
    //                       Carbs: {ingredient.carb}g
    //                     </li>
    //                     <li className="nutrients_item" key={ingredient.protein}>
    //                       Protein: {ingredient.protein}g
    //                     </li>
    //                   </div>
    //                 );
    //               })}
    //             </div>
    //           </div>
    //         );
    //       })
    //     ) : (
    //         <div id="no_dishes">
    //           No dishes yet! Add some food to see your tracked dishes.
    //       </div>
    //       )}
    //   </div>
    // );
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

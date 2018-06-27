import React from 'react';
import { connect } from 'react-redux';
import './FoodList.css';

import moment from 'moment-timezone';

// const meals = ['all', 'breakfast', 'lunch', ]

class FoodList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: {
        all: { calories: 0 },
        breakfast: { calories: 0 },
        lunch: { calories: 0 },
        dinner: { calories: 0 },
        ready: false
      },
      meal: 'all'
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.props);
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
        const createdAt = moment(dish.created_at).format();
        meals.all[dish.created_at] = dish;
        if (moment(dish.created_at).isBetween(breakfast.start, breakfast.end)) {
          meals.breakfast[dish.created_at] = dish;
        }
        if (moment(dish.created_at).isBetween(lunch.start, lunch.end)) {
          meals.lunch[dish.created_at] = dish;
        }
        if (moment(dish.created_at).isBetween(dinner.start, dinner.end)) {
          meals.dinner[dish.created_at] = dish;
        }

        return meals;
      }, this.state.meals);
      meals.ready = true;
      this.setState({ meals }, () => {
        console.log(this.state);
      });
    }
  }
  render() {
    console.log(Object.values(this.state.meals[this.state.meal]));
    return (
      <div id="food_list">
        <div id="food_list_header">
          <span id="food_list_header_text">Today's Meals</span>
        </div>
        <div id="food_list_navbar">
          <button id="food_list_filter_all">All</button>
          <div id="food_list_filter_meal">
            <button>
              <i class="material-icons">chevron_left</i>
            </button>
            <span id="food_list_filter_meal_text">{this.state.meal}</span>
            <button>
              <i class="material-icons">chevron_right</i>
            </button>
          </div>
          <div id="food_list_calories">100 cal</div>
        </div>
        <div id="food_list_body">
          {this.state.meals.ready
            ? Object.values(this.state.meals[this.state.meal]).map(dish => {
                return (
                  <div className="food_list_item">
                    <div className="item_created_at">
                      {console.log(moment(dish.created_at).format('h:mm a'))}
                      {moment(dish.created_at).format('h:mm a')}
                    </div>
                  </div>
                );
              })
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

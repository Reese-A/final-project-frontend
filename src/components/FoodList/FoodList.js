import React from 'react';
import { connect } from 'react-redux';
import './FoodList.css';

class FoodList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.dishes);
    return (
      <div id="foods_list">
        <div id="list_title">Today's dishes</div>
        {this.props.dishes.length > 0 ? (
          this.props.dishes.map(dish => {
            return (
              <div className="dish_wrap" key={dish.id}>
                <div className="dish_name" key={dish.name}>
                  {dish.name}
                </div>
                <div className="food_wrap" key={dish.id}>
                  {dish.ingredients.map(ingredient => {
                    return (
                      <div className="ingredients_wrap" key={ingredient.id}>
                        <div className="ingredient_name" key={ingredient.name}>
                          {ingredient.name}
                        </div>
                        <div
                          className="ingredient_servings"
                          key={ingredient._pivot_servings}
                        >
                          Servings: {ingredient._pivot_servings}{' '}
                        </div>
                        <li
                          className="nutrients_item"
                          key={ingredient.calories}
                        >
                          Calories: {ingredient.calories}
                        </li>
                        <li className="nutrients_item" key={ingredient.fat}>
                          Fat: {ingredient.fat}g
                        </li>
                        <li className="nutrients_item" key={ingredient.carb}>
                          Carbs: {ingredient.carb}g
                        </li>
                        <li className="nutrients_item" key={ingredient.protein}>
                          Protein: {ingredient.protein}g
                        </li>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div id="no_dishes">
            No dishes yet! Add some food to see your tracked dishes.
          </div>
        )}
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

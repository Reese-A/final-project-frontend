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
      <div>
        Food you ate today:
        {this.props.dishes.map(dish => {
          return (
            <div>
              {' '}
              {dish.name}
              <div>
                {dish.ingredients.map(ingredient => {
                  return (
                    <ul>
                      {ingredient.name}
                      <li>Calories: {ingredient.calories}</li>
                      <li>Fat: {ingredient.fat}g</li>
                      <li>Carbs: {ingredient.carb}g</li>
                      <li>Protein: {ingredient.protein}g</li>
                      <br />
                    </ul>
                  );
                })}
              </div>
            </div>
          );
        })}
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

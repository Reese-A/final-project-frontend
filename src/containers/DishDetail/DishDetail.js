import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../../components/Header/Header';
import { loadUserDishes } from '../../redux/actions/dishes-actions';

import './DishDetail.css';

class DishDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      dish: {
        id: null,
        calories: '',
        ingredients: [],
        nutrients: { carbs: 0, fat: 0, protein: 0, grams: 0 },
        name: '',
        posted_by: {
          email: '',
          first_name: '',
          id: null,
          last_name: ''
        },
        ready: false
      }
    };
  }
  componentDidMount() {
    this.props.loadUserDishes();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!Object.values(this.props.dishes).length) return;

    if (!this.state.dish.ready) {
      const { id } = this.props.match.params;
      const dish = this.props.dishes[id];
      const nutrients = dish.ingredients.reduce(
        (nutrients, ingredient) => {
          nutrients.carbs += ingredient.carb;
          nutrients.fat += ingredient.fat;
          nutrients.protein += ingredient.protein;
          nutrients.grams += ingredient.serving_grams;
          return nutrients;
        },
        {
          carbs: 0,
          fat: 0,
          protein: 0,
          grams: 0
        }
      );
      dish.nutrients = nutrients;
      dish.ready = true;
      this.setState({ dish }, () => {
        console.log(this.state.dish);
      });
    }
  }

  render() {
    const { dish } = this.state;
    return (
      <div id="dish_detail">
        <Header />
        <div id="dish_detail_header">
          <img
            id="dish_detail_image"
            src="https://picsum.photos/600/300/?random"
            alt=""
          />
          <button id="dish_detail_menu">
            <i className="material-icons">more_vert</i>
          </button>
        </div>
        <div id="dish_detail_info">
          <div className="dish_detail_row_name">
            <span className="dish_detail_info_name">
              {dish.name || 'Chicken Sandwich'}
            </span>
            <div className="dish_detail_info_calories_container">
              <span className="dish_detail_info_calories">
                {dish.calories}{' '}
              </span>
              <span className="dish_detail_info_calories_text">cal</span>
            </div>
          </div>
          <div className="dish_detail_row_serving">
            <span className="dish_detail_info_serving_grams">
              {dish.nutrients.grams}
            </span>
            <span className="dish_detail_info_serving_grams_text"> grams</span>
          </div>
          <div className="dish_detail_row_nutrients">
            <div className="vert_seperator" />

            <div className="dish_detail_info_protein_container nutrient_container">
              <div className="dish_detail_info_protein nutrient_value_container">
                <span className="dish_detail_info_protein_value nutrient_value">
                  {dish.nutrients.protein}
                </span>
                <span className="dish_detail_info_protein_units nutrient_units">
                  {' '}
                  g
                </span>
              </div>
              <span className="dish_detail_info_protein_text nutrient_text">
                protein
              </span>
            </div>
            <div className="vert_seperator" />
            <div className="dish_detail_info_fat_container nutrient_container">
              <div className="dish_detail_info_fat nutrient_value_container">
                <span className="dish_detail_info_fat_value nutrient_value">
                  {dish.nutrients.fat}
                </span>
                <span className="dish_detail_info_fat_units nutrient_units">
                  {' '}
                  g
                </span>
              </div>
              <span className="dish_detail_info_fat_text nutrient_text">
                fat
              </span>
            </div>
            <div className="vert_seperator" />
            <div className="dish_detail_info_carbs_container nutrient_container">
              <div className="dish_detail_info_carbs nutrient_value_container">
                <span className="dish_detail_info_carbs_value nutrient_value">
                  {dish.nutrients.carbs}
                </span>
                <span className="dish_detail_info_carbs_units nutrient_units">
                  {' '}
                  g
                </span>
              </div>
              <span className="dish_detail_info_carbs_text nutrient_text">
                carbs
              </span>
            </div>
            <div className="vert_seperator" />
          </div>
          <div id="dish_detail_footer">
            <span className="dish_detail_creator">
              created by {dish.posted_by.first_name}
            </span>
            <span className="dish_detail_per_dish">per dish</span>
          </div>
        </div>
        <div id="dish_detail_ingredients">
          <div id="dish_detail_ingredients_header">
            <span id="ingredients_header_text">Ingredients</span>
          </div>
          <div id="dish_detail_ingredients_body">
            {this.state.dish.ingredients.map(ingredient => {
              return (
                <div className="ingredients_item" key={ingredient.id}>
                  <div className="ingredients_item_serving_container">
                    {/* <button
                        type="button"
                        className="serving_add"
                        onClick={event =>
                          this.handleServing(
                            event,
                            item[0],
                            item[1].servings + 0.5
                          )
                        }
                      >
                        <i className="material-icons">expand_less</i>
                      </button> */}
                    <span className="ingredients_item_serving">
                      {Number(ingredient._pivot_servings)}
                    </span>
                    {/* <button
                        type="button"
                        className="serving_subtract"
                        onClick={event =>
                          this.handleServing(
                            event,
                            item[0],
                            item[1].servings - 0.5
                          )
                        }
                      >
                        <i className="material-icons">expand_more</i>
                      </button> */}
                  </div>
                  <div className="ingredients_item_info">
                    <span className="ingredients_item_name">
                      {ingredient.name}
                    </span>
                    <div className="ingredients_item_calories_container">
                      <span className="ingredients_item_calories">
                        {ingredient.calories}
                      </span>
                      <span className="ingredients_item_text"> cal</span>
                    </div>
                  </div>

                  <div className="ingredients_delete_button">
                    {/* <button
                        type="button"
                        onClick={event => this.handleDelete(event, item[0])}
                      >
                        <i className="material-icons">delete_outline</i>
                      </button> */}
                  </div>
                </div>
              );
            })}
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
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DishDetail)
);

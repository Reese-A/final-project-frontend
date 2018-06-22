import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  setDishName,
  setDishFoodServings,
  removeDishFood,
  clearDish,
  createDish
} from '../../../redux/actions/dishes-actions';

import './BuildDishCard.css';

class BuildDishCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleDishSubmit = this.handleDishSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.handleDishClear = this.handleDishClear.bind(this);
    this.handleServing = this.handleServing.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDishName = this.handleDishName.bind(this);
  }
  componentDidMount() {
    this.setState({ search: this.props.item }, () => {
      if (this.state.search) {
        this.getFoodData();
      }
    });
  }

  handleDishSubmit(event) {
    event.preventDefault();
    if (!Object.values(this.props.dish.foods).length) return;
    this.props.createDish(this.props.dish);
    this.props.toggleDishForm();
    // this.props.clearDish();
    this.props.history.push('/dashboard');
  }

  handleDishName(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.props.setDishName(value);
  }

  handleDishClear(event) {
    event.preventDefault();
    this.props.toggleDishForm();
    // this.props.clearDish();
  }

  handleServing(event, id, servings) {
    event.preventDefault();
    if (servings < 0.5) return;
    if (servings > 99) return;
    this.props.setDishFoodServings(id, servings);
  }

  handleDelete(event, id) {
    event.preventDefault();

    this.props.removeDishFood(id);
  }

  render() {
    console.log(this.props.dish);
    return this.props.buildDish ? (
      <div id="build_dish_card_container">
        <div id="build_dish_header">Build a Dish</div>
        <form
          id="build_dish_form"
          onSubmit={this.handleDishSubmit}
          autoComplete="off"
          autoCorrect="off"
        >
          <div className="build" id="build_dish_card">
            <div id="build_dish_card_header">
              <input
                id="build_dish_card_header_input"
                type="text"
                name="name"
                placeholder="Enter a name"
                onChange={this.handleDishName}
                required
              />
              <div id="build_dish_card_header_calories_container">
                <span id="build_dish_card_header_calories">
                  {this.props.dish.calories}
                </span>
                <span id="build_dish_card_header_calories_text"> cal</span>
              </div>
            </div>
            <div id="build_dish_card_body">
              {Object.values(this.props.dish.foods).length ? null : (
                <span id="build_dish_card_body_empty">
                  Search an item and add it
                </span>
              )}
              {Object.entries(this.props.dish.foods).map(item => {
                return (
                  <div className="build_dish_card_item" key={item[0]}>
                    <div className="build_dish_card_item_serving_container">
                      <button
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
                      </button>
                      <span className="build_dish_card_item_serving">
                        {item[1].servings}
                      </span>
                      <button
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
                      </button>
                    </div>
                    <div className="build_dish_card_item_info">
                      <span className="build_dish_card_item_name">
                        {item[1].food.name}
                      </span>
                      <div className="build_dish_card_item_calories_container">
                        <span className="build_dish_card_item_calories">
                          {item[1].food.calories}
                        </span>
                        <span className="build_dish_card_item_text"> cal</span>
                      </div>
                    </div>

                    <div className="build_dish_card_delete_button">
                      <button
                        type="button"
                        onClick={event => this.handleDelete(event, item[0])}
                      >
                        <i className="material-icons">delete_outline</i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div id="build_dish_card_submit">
              <button type="button" onClick={this.handleDishClear}>
                Cancel
              </button>
              <button type="submit">Build Dish</button>
            </div>
          </div>
        </form>
      </div>
    ) : (
      <div className="prompt" id="build_dish_card">
        <div id="build_dish_card_header">Build a dish instead</div>
        <div id="build_dish_card_body">
          Sometimes you can’t find exactly what you’re looking for, but that’s
          okay! You can just build it yourself. Just search the foods that make
          up your dish and add them. Click the button below to get started.
        </div>
        <div onClick={this.props.toggleDishForm} id="build_dish_card_button">
          <span id="build_dish_card_button_text">Build a Dish </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dish: state.newDish
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createDish: dish => {
      dispatch(createDish(dish));
    },
    setDishName: name => {
      dispatch(setDishName(name));
    },
    setDishFoodServings: (id, servings) => {
      dispatch(setDishFoodServings(id, servings));
    },
    // addDishFood: (servings, food) => {
    //   dispatch(addDishFood(servings, food));
    // },
    removeDishFood: id => {
      dispatch(removeDishFood(id));
    },
    clearDish: () => {
      dispatch(clearDish());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BuildDishCard)
);

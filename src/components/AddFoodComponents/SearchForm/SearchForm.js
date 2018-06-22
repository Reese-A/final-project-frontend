import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  createDish,
  addDishFood,
  clearDish
} from '../../../redux/actions/dishes-actions';

import FoodCard from '../FoodCard/FoodCard';
import BuildDishCard from '../BuildDishCard/BuildDishCard';

import './SearchForm.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      food: {
        calories: 0,
        carb: 0,
        category: {
          created_at: '',
          id: 0,
          name: '',
          updated_at: ''
        },
        category_id: 0,
        created_at: '',
        fat: 0,
        id: 0,
        name: '',
        popularity: 0,
        protein: 0,
        serving_grams: 0,
        serving_size: '',
        updated_at: ''
      },
      servings: 1,
      showFoodCard: false,
      showForm: false,
      buildDish: false,
      name: ''
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleServingsSubmit = this.handleServingsSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDishName = this.handleDishName.bind(this);
    this.toggleDishForm = this.toggleDishForm.bind(this);
    this.addFoodToDish = this.addFoodToDish.bind(this);
    this.dishChangeHandler = this.dishChangeHandler.bind(this);
    this.dishSubmitHandler = this.dishSubmitHandler.bind(this);
    this.getFoodData = this.getFoodData.bind(this);
  }
  componentDidMount() {
    this.setState({ search: this.props.item }, () => {
      if (this.state.search) {
        this.getFoodData();
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {}

  handleChange(event) {
    let { value, name } = event.target;

    // if (name === 'servings') value = Number(value);

    this.setState({ [name]: value }, () => {
      if (name === 'search' && value === '')
        this.setState({ showFoodCard: false });
    });
  }

  handleDishName(event) {
    let { value } = event.target;

    this.props.setDishName(value);
  }

  dishChangeHandler(event) {
    const { value } = event.target;
    const dish = { ...this.state.dish };
    dish.name = value;
    this.setState({ dish }, () => {});
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    this.getFoodData();
    document.getElementById('add_food_search_input').blur();
    // this.addFoodToDish(event);
  }

  handleServingsSubmit(event) {
    event.preventDefault();
    this.addFoodToDish(event);
  }

  getFoodData() {
    const search = this.state.search.toLowerCase();

    return fetch(`/api/foods/${search}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(food => {
        this.setState({ food: food, showFoodCard: true });
      });
  }
  toggleFoodCard() {
    this.setState({ showFoodCard: !this.state.showFoodCard });
  }
  toggleDishForm() {
    this.setState({ buildDish: !this.state.buildDish });
  }

  addFoodToDish(event) {
    event.preventDefault();
    const { servings, food } = this.state;
    if (this.state.buildDish) {
      this.props.addDishFood(Number(servings), food);
      this.setState({ search: '', showFoodCard: false });
    } else {
      console.log();
      const dish = { ...this.props.dish };
      dish.name = food.name;
      dish.calories = food.calories * servings;
      dish.foods[food.id] = { servings: Number(servings), food };
      this.props.createDish(dish);
      this.props.clearDish();
      this.props.history.push('/dashboard');
    }
    document.getElementById('add_food_servings_input').blur();
  }

  dishSubmitHandler(event) {
    event.preventDefault();
    this.props.createDish(this.state.dish);
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div id="search_form">
        <form
          onSubmit={this.handleSearchSubmit}
          autoComplete="off"
          autoCorrect="off"
        >
          <div id="add_food_search_container">
            <input
              id="add_food_search_input"
              value={this.state.search}
              type="text"
              name="search"
              placeholder="Search for something"
              required
              onChange={this.handleChange}
              autoFocus
            />
            <button id="add_food_search_button" onClick={this.getFoodData}>
              <i className="material-icons">search</i>
            </button>
          </div>
        </form>

        {this.state.showFoodCard ? (
          <div id="add_food_nutrition_data">
            <FoodCard
              name={this.state.food.name}
              calories={this.state.food.calories}
              serving_grams={this.state.food.serving_grams}
              serving_size={this.state.food.serving_size}
              carb={this.state.food.carb}
              fat={this.state.food.fat}
              protein={this.state.food.protein}
            />
            <form onSubmit={this.handleServingsSubmit}>
              <div id="add_food_servings_container">
                <div id="add_food_servings_input_container">
                  <label htmlFor="add_food_servings_input">Servings: </label>
                  <input
                    id="add_food_servings_input"
                    name="servings"
                    type="number"
                    max="99"
                    min="0.5"
                    step="0.5"
                    value={this.state.servings}
                    onChange={this.handleChange}
                  />
                </div>
                <button id="add_food_servings_input_button">Add</button>
              </div>
            </form>
          </div>
        ) : null}

        {this.state.showFoodCard ? (
          <div className="horizontal_seperator" />
        ) : null}

        <BuildDishCard
          handleDishName={this.handleDishName}
          toggleDishForm={this.toggleDishForm}
          dish={this.props.dish}
          buildDish={this.state.buildDish}
        />
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
    addDishFood: (servings, food) => {
      dispatch(addDishFood(servings, food));
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
  )(SearchForm)
);

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createDish } from '../../../redux/actions/food-actions';

import FoodCard from '../FoodCard/FoodCard';
import BuildDishCard from '../BuildDishCard/BuildDishCard';

import './SearchForm.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // width: 0,
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
      dish: {
        name: '',
        foods: []
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

    this.setState({ [name]: value }, () => {
      if (name === 'search' && value === '')
        this.setState({ showFoodCard: false });
    });
  }

  dishChangeHandler(event) {
    const { value, name } = event.target;
    const dish = { ...this.state.dish };
    dish.name = value;
    this.setState({ dish }, () => {
      console.log(this.state);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('get');
    // this.getFoodData();
    // this.addFoodToDish(event);
  }

  getFoodData() {
    console.log(this.state);
    console.log(this.state.search);
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
        console.log(food);
        this.setState({ food: food, showFoodCard: true });
      });
  }
  toggleFoodCard() {
    this.setState({ showFoodCard: !this.state.showFoodCard });
  }
  toggleDishForm() {
    this.setState({ showForm: !this.state.showForm });
  }

  addFoodToDish(event) {
    event.preventDefault();
    const name = this.state.search;
    const foods = { servings: this.state.servings, food: this.state.food };

    // const dish = { ...this.state.dish };
    // dish.foods.push(this.state.food);
    // this.setState({
    //   dish: dish
    // });

    this.props.addFoodToDish(name, foods);

    if (!this.state.buildDish) this.props.createDish({ name, foods: [foods] });
  }

  dishSubmitHandler(event) {
    event.preventDefault();
    this.props.createDish(this.state.dish);
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div id="search_form">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div id="add_food_search_container">
            <input
              value={this.state.search}
              type="text"
              name="search"
              placeholder="Search for something"
              onChange={this.handleChange}
              autoFocus
            />
            <button id="add_food_search_button" onClick={this.getFoodData}>
              <i class="material-icons">search</i>
            </button>
          </div>
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
              <div id="add_food_servings_container">
                <div id="add_food_servings_input_container">
                  <label htmlFor="add_food_servings_input">Servings: </label>
                  <input
                    id="add_food_servings_input"
                    name="servings"
                    type="number"
                    max="50"
                    min="1"
                    value={this.state.servings}
                    onChange={this.handleChange}
                  />
                </div>
                <button onClick={this.addFoodToDish}>Add</button>
              </div>
            </div>
          ) : null}
          <BuildDishCard />
        </form>

        {/* {this.state.showForm ? (
          <div id="dishForm">
            <label htmlFor="name">Dish name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.dish.name}
              onChange={this.dishChangeHandler}
            />
            <button onClick={this.addFoodToDish}>Add food to dish</button>
            {this.state.dish.foods.length ? (
              <button onClick={this.dishSubmitHandler}>Create Dish</button>
            ) : null}
            <div id="foodList">
              This dish consists of...
              {this.state.dish.foods.map(food => {
                return (
                  <div key={food.id} className="foodName">
                    {food.name}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null} */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createDish: dish => {
      dispatch(createDish(dish));
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SearchForm)
);

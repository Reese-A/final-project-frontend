import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createDish } from '../../redux/actions/food-actions';

import FoodCard from '../FoodCard/FoodCard';

import './SearchForm.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
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
      showFoodCard: false,
      showForm: false,
      dish: {
        name: '',
        foods: []
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.toggleDishForm = this.toggleDishForm.bind(this);
    this.addFoodToDish = this.addFoodToDish.bind(this);
    this.dishChangeHandler = this.dishChangeHandler.bind(this);
    this.dishSubmitHandler = this.dishSubmitHandler.bind(this);
  }
  componentDidMount() {
    this.setState({ search: this.props.item }, () => {
      if (this.state.search) {
        this.getFoodData();
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {}

  changeHandler(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value.toLowerCase() });
    if (value === '') this.setState({ showFoodCard: false });
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
    this.getFoodData();
  }

  getFoodData() {
    return fetch(`/api/foods/${this.state.search}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(food => {
        this.setState({ food: food, showFoodCard: true });
        console.log(this.state.food);
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
    const dish = { ...this.state.dish };
    dish.foods.push(this.state.food);
    this.setState({
      dish: dish
    });
  }

  dishSubmitHandler(event) {
    event.preventDefault();
    console.log('test');
    this.props.createDish(this.state.dish);
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div id="search_form">
        <form onSubmit={this.handleSubmit}>
          <div id="add_food_search_container">
            <input
              value={this.state.search}
              type="text"
              name="search"
              placeholder="Search for something"
              onChange={this.changeHandler}
              autoFocus
            />
          </div>
        </form>
        {this.state.showFoodCard ? (
          <FoodCard
            name={this.state.food.name}
            calories={this.state.food.calories}
            serving_grams={this.state.food.serving_grams}
            serving_size={this.state.food.serving_size}
            carb={this.state.food.carb}
            fat={this.state.food.fat}
            protein={this.state.food.protein}
          />
        ) : null}

        <div />

        {this.state.showForm ? (
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
        ) : null}
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

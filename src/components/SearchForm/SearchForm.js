import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createDish } from '../../redux/actions/food-actions';
import { loadConsumption } from '../../redux/actions/dishes-actions';
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
        return fetch(`/api/foods/${this.state.search}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin'
        })
          .then(res => res.json())
          .then(food => {
            console.log(food);
          });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {}

  changeHandler(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value.toLowerCase() });
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
    console.log(this.state);
    return fetch(`/api/foods/${this.state.search}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(food => {
        this.setState({ food: food });
        console.log(this.state.food);
      });
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
          <div className="add_food_search_container">
            <input
              value={this.state.search}
              type="text"
              name="search"
              placeholder="Search for something"
              onChange={this.changeHandler}
              autoFocus
            />
            <button>
              <i className="material-icons">search</i>
            </button>
          </div>
        </form>

        {this.state.food.id ? (
          // could be its own component
          <div id="nutrionFacts">
            <div className="nutrionTitle">Nutrition Facts</div>
            <div className="sectionWrap">
              <div className="servingSize">
                Serving size {this.state.food.serving_size}
              </div>
              <div className="servingGrams">
                Serving size in grams {this.state.food.serving_grams}g
              </div>
            </div>
            <div className="separatingLine" />
            <div className="sectionWrap">
              <div className="totalCalories">
                Calories {this.state.food.calories}
              </div>
              <div className="fatCalor">
                Calories from fat {this.state.food.fat * 9}
              </div>
            </div>
            <div className="sectionWrap">
              <div className="totalFat">Total Fat {this.state.food.fat}g</div>
            </div>
            <div className="sectionWrap">
              <div className="totalCarb">
                Total Carbohydrate {this.state.food.carb}g
              </div>
            </div>
            <div className="sectionWrap">
              <div className="totalProtein">
                Total Protein {this.state.food.protein}g
              </div>
            </div>
            <button>Add to list</button>
            {!this.state.dish.foods.length ? (
              <button onClick={this.toggleDishForm}>Create a dish</button>
            ) : null}
          </div>
        ) : null}

        {/* could be its own component */}
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
    },
    loadConsumption: () => {
      dispatch(loadConsumption());
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SearchForm)
);

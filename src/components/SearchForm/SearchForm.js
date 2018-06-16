import React from 'react';

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
      showFood: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
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

  changeHandler(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value.toLowerCase() });
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
        this.setState({ food, showFood: true }, () => {
          console.log(this.state);
          console.log(this.state.food);
        });
      });
  }

  render() {
    const { food } = this.state;
    const foodData = (
      <div id="add_food_nutrition_container">
        <span id="food_name">{food.name}</span>
        <div>
          <span id="food_grams">{food.carb + food.protein + food.fat}</span>
          <span id="food_calories">{food.calories}</span>
        </div>
        {/* <ul>
          {Object.entries(this.state.food).map((tuple, index) => {
            return <li key={index}>{tuple[0]}</li>;
          })}
        </ul> */}
      </div>
    );
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
            <button>
              <i className="material-icons">search</i>
            </button>
          </div>
          {this.state.showFood ? foodData : null}
        </form>
      </div>
    );
  }
}

export default SearchForm;

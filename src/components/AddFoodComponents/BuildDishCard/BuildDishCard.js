import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './BuildDishCard.css';

class BuildDishCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.setState({ search: this.props.item }, () => {
      if (this.state.search) {
        this.getFoodData();
      }
    });
  }

  handleChange(event) {
    let { value, name } = event.target;
    if (typeof value === 'string') value = value.toLowerCase();
    // if (name === 'servings') value = Number(value);
    this.setState({ [name]: value }, () => {
      console.log(this.state);
      if (name === 'search' && value === '')
        this.setState({ showFoodCard: false });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('get');
    // this.getFoodData();
    this.addFoodToDish(event);
  }

  render() {
    return (
      <div id="build_dish_card">
        <div id="build_dish_card_header">Build a dish instead</div>
        <div id="build_dish_card_body">
          Sometimes you can’t find exactly what you’re looking for, but that’s
          okay! You can just build it yourself.
        </div>
        <div id="build_dish_card_button">Build a Dish </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(
    null,
    null
  )(BuildDishCard)
);

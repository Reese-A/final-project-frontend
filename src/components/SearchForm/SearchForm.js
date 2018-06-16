import React from 'react';

import './SearchForm.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      search: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  componentDidMount() {
    this.setState({ search: this.props.item });
  }

  componentDidUpdate(prevProps, prevState) {}

  changeHandler(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
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
        console.log(food);
      });
  }

  render() {
    return (
      <div id="search_form">
        <form onSubmit={this.handleSubmit}>
          <div className="add_food_search_container">
            <input
              value={this.state.search}
              type="search"
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
      </div>
    );
  }
}

export default SearchForm;

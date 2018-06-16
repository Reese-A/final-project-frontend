import React from 'react';

import './SearchForm.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div id="search_form">
        <form onSubmit={this.handleSubmit}>
          <div className="add_food_search_container">
            <input
              value={this.props.item}
              type="search"
              name="search"
              placeholder="Search for something"
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

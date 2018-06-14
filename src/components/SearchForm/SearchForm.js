import React from 'react';

import './SearchForm.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
  }
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return <div id="search_form">Search</div>;
  }
}

export default SearchForm;

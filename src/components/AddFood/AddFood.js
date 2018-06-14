import React from 'react';

import Header from '../../components/Header/Header';
import Camera from '../Camera/Camera';
import SearchForm from '../SearchForm/SearchForm';

import './AddFood.css';

class AddFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCamera: true };
    this.toggleForm = this.toggleForm.bind(this);
  }
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  toggleForm(event) {
    event.preventDefault();
    this.setState({ showCamera: !this.state.showCamera });
  }

  render() {
    return (
      <div id="add_food">
        <Header />
        {this.state.showCamera ? <Camera /> : <SearchForm />}
        <div className="or_line_seperator">
          <div className="line_seperator" />
          <span>OR</span>
          <div className="line_seperator" />
        </div>
        <button id="toggle" onClick={this.toggleForm}>
          {this.state.showCamera ? 'Search Food Instead' : 'Use Camera'}
        </button>
      </div>
    );
  }
}

export default AddFood;

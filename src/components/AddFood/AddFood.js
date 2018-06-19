import React from 'react';

import Header from '../../components/Header/Header';
import Camera from '../Camera/Camera';
import SearchForm from '../SearchForm/SearchForm';
import { Link } from 'react-router-dom';

import './AddFood.css';

class AddFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCamera: false,
      showSlideDown: false,
      slideDown: false,
      options: [],
      item: ''
    };

    this.setSlideDownOptions = this.setSlideDownOptions.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.toggleSlideDown = this.toggleSlideDown.bind(this);
    this.searchFood = this.searchFood.bind(this);
  }
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  toggleForm(event) {
    event.preventDefault();
    this.setState({ showCamera: !this.state.showCamera });
  }

  toggleSlideDown(event) {
    this.setState({
      slideDown: !this.state.slideDown,
      showSlideDown: !this.state.showSlideDown
    });
  }

  searchFood(event) {
    const { value } = event.target.dataset;

    this.setState({
      showCamera: !this.state.showCamera,
      slideDown: !this.state.slideDown,
      showSlideDown: !this.state.showSlideDown,
      item: value
    });
  }

  setSlideDownOptions(array) {
    this.setState({ options: array }, () => {
      console.log(this.state);
    });
  }

  render() {
    return (
      <div id="add_food">
        {/* Can be made into a Component */}
        <div
          id="slide_down"
          className={`${this.state.showSlideDown ? 'show' : ''}`}
        >
          {/* <div /> */}

          <ul>
            {this.state.options.map((option, index) => {
              return (
                <li key={index} onClick={this.searchFood} data-value={option}>
                  {option}
                </li>
              );
            })}
          </ul>
        </div>

        <div
          id="add_food_content"
          className={`${this.state.slideDown ? 'slide_down tint' : ''}`}
        >
          <Header />

          {this.state.showCamera ? (
            <Camera
              setSlideDownOptions={this.setSlideDownOptions}
              toggleSlideDown={this.toggleSlideDown}
            />
          ) : (
            <SearchForm item={this.state.item} />
          )}

          {/* Can be made into a Component */}
          <div className="or_line_seperator">
            <div className="line_seperator" />
            <span>OR</span>
            <div className="line_seperator" />
          </div>

          {/* Can be made into a Component */}
          <button
            id="toggle"
            className={`${this.state.showCamera ? 'search_form' : 'camera'}`}
            onClick={this.toggleForm}
          >
            {this.state.showCamera ? (
              'Search Food Instead'
            ) : (
              <i class="material-icons">camera_alt</i>
            )}
          </button>
          <Link to="/dashboard"> Return to dashboard </Link>
        </div>
      </div>
    );
  }
}

export default AddFood;

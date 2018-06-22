import React from 'react';

import Header from '../../components/Header/Header';
import Camera from '../../components/AddFoodComponents/Camera/Camera';
import SearchForm from '../../components/AddFoodComponents/SearchForm/SearchForm';

import './AddFood.css';

class AddFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCamera: true,
      showSlideDown: false,
      slideDown: false,
      loading: false,
      options: [],
      item: '',
      dish: {
        name: '',
        foods: []
      }
    };

    this.setSlideDownOptions = this.setSlideDownOptions.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.toggleSlideDown = this.toggleSlideDown.bind(this);
    this.showSlideDown = this.showSlideDown.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.showLoading = this.showLoading.bind(this);
    this.searchFood = this.searchFood.bind(this);
    this.addFoodToDish = this.addFoodToDish.bind(this);
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

  showSlideDown(event) {
    this.setState({
      slideDown: true,
      showSlideDown: true
    });
  }

  toggleLoading(event) {
    this.setState({
      loading: !this.state.loading
    });
  }

  showLoading(event) {
    this.setState({
      loading: true
    });
  }

  searchFood(event) {
    event.preventDefault();
    const { value } = event.target.dataset;
    console.log('search');
    this.setState({
      showCamera: false,
      slideDown: false,
      showSlideDown: false,
      item: value
    });
  }

  addFoodToDish(name, foods) {
    this.setState(
      { dish: { name: name, foods: [...this.state.dish.foods, ...foods] } },
      () => {
        console.log(this.state);
      }
    );
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
          <div id="slide_down_text">
            {this.state.options.length ? 'This is what we found' : 'No results'}
          </div>
          <div id="slide_down_scan_results">
            {this.state.options.map((option, index) => {
              return (
                <div
                  className="slide_down_items"
                  key={index}
                  data-value={option}
                  onClick={this.searchFood}
                >
                  <span className="slide_down_text">{option}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div id="loading" className={`${this.state.loading ? 'show' : ''}`}>
          <h1>Cooking in progress..</h1>
          <div id="cooking">
            <div class="bubble" />
            <div class="bubble" />
            <div class="bubble" />
            <div class="bubble" />
            <div class="bubble" />
            <div id="area">
              <div id="sides">
                <div id="pan" />
                <div id="handle" />
              </div>
              <div id="pancake">
                <div id="pastry" />
              </div>
            </div>
          </div>
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
              showSlideDown={this.showSlideDown}
              toggleLoading={this.toggleLoading}
              showLoading={this.showLoading}
            />
          ) : (
            <SearchForm
              item={this.state.item}
              dish={this.state.dish}
              addFoodToDish={this.addFoodToDish}
            />
          )}

          {/* Can be made into a Component */}

          {this.state.showCamera ? (
            <div className="or_line_seperator">
              <div className="line_seperator" />
              <span>OR</span>
              <div className="line_seperator" />
            </div>
          ) : null}

          {/* Can be made into a Component */}
          <div id="toggle_container">
            <button
              id="toggle"
              className={`${this.state.showCamera ? 'search_form' : 'camera'}`}
              onClick={this.toggleForm}
            >
              {this.state.showCamera ? (
                'Search Food'
              ) : (
                <i className="material-icons">camera_alt</i>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddFood;

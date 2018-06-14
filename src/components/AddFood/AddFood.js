import React from 'react';

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
    console.log(this.state.showCamera);
    return (
      <div id="add_food">
        {this.state.showCamera ? <Camera /> : <SearchForm />}
        <button onClick={this.toggleForm}>Toggle</button>
      </div>
    );
  }
}

export default AddFood;

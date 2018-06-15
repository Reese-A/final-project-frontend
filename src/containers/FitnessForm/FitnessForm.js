import React from 'react';
import { connect } from 'react-redux';
import { saveFitnessForm } from '../../redux/actions/fitness-form-actions';

class FitnessForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activityLevels: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.previousPage = this.previousPage.bind(this);

  };

  changeHandler(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  previousPage(event) {
    event.preventDefault();
    this.props.saveFitnessForm({ ...this.state });
    this.props.previousPage();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.saveFitnessForm({ ...this.state });
    this.props.nextPage();
  };

  componentDidMount() {
    this.setState({ ...this.props.fitnessForm });
  }

  render() {
    const activityOptions = this.props.activityLevels.map(activityLevel => {
      return (
        <option key={activityLevel.id} value={activityLevel.id}>
          {activityLevel.name}
        </option>
      );
    });

    return (

      <div id="fitness_form">
        <div id="fitness_form_title">How active are you?</div>
        <br />
        <form onSubmit={this.handleSubmit} >
          <div id="activity_level_container" className="select_container">
            <label htmlFor="activity_level">Goal:</label>
            <select
              name="activityLevel"
              id="activity_level"
              value={this.state.activityLevel}
              onChange={this.changeHandler}
              required
            >
              {activityOptions}
              <option value="" selected disabled hidden>Choose here</option>
            </select>
          </div>
          <br />
          <button type="click" name="previous" onClick={this.previousPage}>Previous</button>
          <button type="submit" name="next" >Next</button>
        </form>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    activityLevels: state.activityLevel,
    fitnessForm: state.registrationForm.fitnessForm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveFitnessForm: (form) => {
      dispatch(saveFitnessForm(form));
    }
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(FitnessForm);
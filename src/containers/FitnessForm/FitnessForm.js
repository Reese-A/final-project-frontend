import React from 'react';
import { connect } from 'react-redux';
import { saveFitnessForm } from '../../redux/actions/fitness-form-actions';

import './FitnessForm.css';

class FitnessForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activity_level_id: '',
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
    const activityOptions = this.props.activityLevels.map(activity_level => {
      return (
        <option key={activity_level.id} value={activity_level.id}>
          {activity_level.name}
        </option>
      );
    });

    return (
      <div id="fitnessForm">

        <div id="fitnessFormImage">
          <div className="homeTitle">fitbyte</div>
        </div>

        <div id="fitness_form">

          <form onSubmit={this.handleSubmit}>

            <div className="formGroup">
              <label htmlFor="activity_level_id">Activity Level:</label>
              <select
                name="activity_level_id"
                id="activity_level_id"
                value={this.state.activity_level_id}
                onChange={this.changeHandler}
                required
              >
                <option value="" disabled >Choose here</option>
                {activityOptions}
              </select>
            </div>

            <div id="levelDescription">
              <div id="lightlyActive">
                Lightly Active: video gaming is life (0~15 minutes of activity per day)
              </div>
              <div id="active">
                Active: some effort is made (30~60 minutes of activity per day)
              </div>
              <div id="veryActive">
                Very Active: no pain no gain! (60+ minutes of activity per day)
              </div>
            </div>

            <div id="pageControl">
              <button type="click" name="previous" onClick={this.previousPage}>Previous</button>
              <button type="submit" name="next" >Next</button>
            </div>

          </form>

        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    genders: state.gender,
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
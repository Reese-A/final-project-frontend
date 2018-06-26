import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { postRegistration } from '../../redux/actions/review-form-actions';

import './ReviewForm.css';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      birthday: '',
      weight: '',
      heightFeet: '',
      heightInches: '',
      gender_id: '',
      goal_id: '',
      activity_level_id: '',
      default_profile: null

    };
    this.editAccountPage = this.editAccountPage.bind(this);
    this.editProfilePage = this.editProfilePage.bind(this);
    this.editFitnessPage = this.editFitnessPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const reviewFormData = {};
    for (const key in this.props.accountForm) {
      reviewFormData[key] = this.props.accountForm[key];
    }
    for (const key in this.props.profileForm) {
      reviewFormData[key] = this.props.profileForm[key];
    }
    for (const key in this.props.fitnessForm) {
      reviewFormData[key] = this.props.fitnessForm[key];
    }
    reviewFormData['height'] = (Number(reviewFormData.heightFeet) * 12) + Number(reviewFormData.heightInches);
    this.setState({ ...reviewFormData });

  }

  editAccountPage(event) {
    event.preventDefault();
    this.props.firstPage();
  };

  editProfilePage(event) {
    event.preventDefault();
    this.props.secondPage();
  };

  editFitnessPage(event) {
    event.preventDefault();
    this.props.previousPage();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.postRegistration({ ...this.state });
    this.props.history.push('/');
  }

  render() {
    const genderOptions = this.props.genders.map(gender => {
      return (
        <option key={gender.id} value={gender.id}>
          {gender.name}
        </option>
      );
    });

    const goalOptions = this.props.goals.map(goal => {
      return (
        <option key={goal.id} value={goal.id}>
          {goal.name}
        </option>
      );
    });

    const activityOptions = this.props.activityLevels.map(activity_level => {
      return (
        <option key={activity_level.id} value={activity_level.id}>
          {activity_level.name}
        </option>
      );
    });

    return (
      <div id="reviewForm">

        <div id="reviewFormImage">
          <div className="homeTitle">fitbyte</div>
        </div>

        <div className="formModal">
          <form className="registrationForm">
            <div className="reviewContainer">
              <div className="reviewTitle">Account information:</div>

              <div className="formGroup">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  value={this.state.email}
                  disabled
                />
              </div>

              <div className="formGroup">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={this.state.password}
                  disabled
                />
              </div>

              <div className="formGroup">
                <label htmlFor="first_name">First Name:</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  required
                  value={this.state.first_name}
                  disabled
                />
              </div>

              <div className="formGroup">
                <label htmlFor="last_name">Last Name:</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  required
                  value={this.state.last_name}
                  disabled
                />
              </div>

              <button type="click" onClick={this.editAccountPage}>Edit account information</button>

            </div>

            <div className="reviewContainer">
              <div className="reviewTitle">Profile information:</div>

              <div className="formGroup">
                <label htmlFor="birthday">Birthday:</label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  required
                  value={this.state.birthday}
                  disabled
                />
              </div>

              <div className="formGroup">
                <label htmlFor="weight">Weight(lbs):</label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  required
                  value={this.state.weight}
                  disabled
                />
              </div>

              <div className="formGroup">
                <label htmlFor="heightFeet">Height(feet):</label>
                <input
                  type="text"
                  id="heightFeet"
                  name="heightFeet"
                  required
                  value={this.state.heightFeet}
                  disabled
                />
              </div>

              <div className="formGroup">
                <label htmlFor="heightInches">Height(inches):</label>
                <input
                  type="text"
                  id="heightInches"
                  name="heightInches"
                  required
                  value={this.state.heightInches}
                  disabled
                />
              </div>

              <div className="formGroup">
                <label htmlFor="gender_id">Biological Gender:</label>
                <select
                  name="gender_id"
                  id="gender_id"
                  value={this.state.gender_id}
                  required
                  disabled
                >
                  {genderOptions}
                </select>
              </div>

              <div className="formGroup">
                <label htmlFor="goal_id">Goal:</label>
                <select
                  name="goal_id"
                  id="goal_id"
                  value={this.state.goal_id}
                  required
                  disabled
                >
                  {goalOptions}
                </select>
              </div>

              <button type="click" onClick={this.editProfilePage}>Edit profile information</button>

            </div>

            <div className="reviewContainer">
              <div className="reviewTitle">Fitness information:</div>

              <div className="formGroup">
                <label htmlFor="activity_level_id">Activity Level:</label>
                <select
                  name="activity_level_id"
                  id="activity_level_id"
                  value={this.state.activity_level_id}
                  required
                  disabled
                >
                  {activityOptions}
                </select>
              </div>

              <button type="click" onClick={this.editFitnessPage}>Edit fitness information</button>
              <button id="submitButton" name="next" onClick={this.handleSubmit}>Submit</button>
              <Link to="/">Back to homepage</Link>

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
    goals: state.goal,
    activityLevels: state.activityLevel,
    accountForm: state.registrationForm.accountForm,
    profileForm: state.registrationForm.profileForm,
    fitnessForm: state.registrationForm.fitnessForm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postRegistration: (form) => {
      dispatch(postRegistration(form));
    }
  }
}

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(ReviewForm))
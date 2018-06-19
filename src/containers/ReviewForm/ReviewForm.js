import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postRegistration } from '../../redux/actions/review-form-actions';

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
    this.setState({ ...reviewFormData }, () => {

      console.log(this.state)
    });

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
      <div id="review_form">
        <div id="acount_review_container">
          <div id="account_review_title">Account information:</div>

          <div id="review_email_container">
            <span>Email address:</span>
            <input
              type="text"
              id="email"
              name="email"
              required
              value={this.state.email}
              disabled
              hidden
            />
          </div>
          <br />
          <input
            type="password"
            id="account_password"
            name="password"
            required
            value={this.state.password}
            disabled
            hidden
          />
          <div id="review_first_name_container">
            <span>First name: </span>
            <input
              type="text"
              id="account_first_name"
              name="first_name"
              required
              value={this.state.first_name}
              disabled
            />
          </div>
          <br />
          <div id="review_last_name_container">
            <span>Last name:</span>
            <input
              type="text"
              id="account_last_name"
              name="last_name"
              required
              value={this.state.last_name}
              disabled
            />
          </div>
          <br />
          <button type="click" onClick={this.editAccountPage}>Edit account information</button>
        </div>
        <br />
        <div id="profile_review_container">
          <div id="profile_review_title">Profile information:</div>
          <br />
          <div id="review_birthday_container">
            <span>Birthday:</span>
            <input
              type="date"
              id="profile_birthday"
              name="birthday"
              required
              value={this.state.birthday}
              disabled
            />
          </div>
          <br />
          <div id="review_weight_container">
            <span>Weight in pounds: </span>
            <input
              type="text"
              id="profile_weight"
              name="weight"
              required
              value={this.state.weight}
              disabled
            />
          </div>
          <br />
          <div id="review_height_container">
            <div>Height:</div>
            <span>Feet:</span>
            <input
              type="text"
              id="profile_height_feet"
              name="heightFeet"
              required
              value={this.state.heightFeet}
              disabled
            />
            <br />
            <span>Inches: </span>
            <input
              type="text"
              id="profile_height_inches"
              name="heightInches"
              required
              value={this.state.heightInches}
              disabled
            />
            <br />
          </div>
          <br />
          <div id="profile_gender_container" className="select_container">
            <label htmlFor="profile_gender">Biological Gender:</label>
            <select
              name="gender_id"
              id="profile_gender"
              value={this.state.gender_id}
              required
              disabled
            >
              {genderOptions}

            </select>
          </div>
          <br />
          <div id="profile_goal_container" className="select_container">
            <label htmlFor="profile_goal">Goal:</label>
            <select
              name="goal_id"
              id="profile_goal"
              value={this.state.goal_id}
              required
              disabled
            >
              {goalOptions}

            </select>
          </div>
          <br />
          <button type="click" onClick={this.editProfilePage}>Edit profile information</button>
        </div>
        <br />
        <div id="fitness_review_container">
          <div id="fitness_review_title">Fitness information:</div>
          <br />
          <div id="activity_level_container" className="select_container">
            <label htmlFor="activity_level">Activity Level:</label>
            <select
              name="activity_level_id"
              id="activity_level"
              value={this.state.activity_level_id}
              required
              disabled
            >
              {activityOptions}

            </select>
          </div>
          <br />
          <button type="click" onClick={this.editFitnessPage}>Edit account information</button>
        </div>
        <br />
        <button name="next" onClick={this.handleSubmit}>Submit</button>
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
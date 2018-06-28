import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateProfile } from '../../redux/actions/settings-actions';

import './UpdateProfileForm.css';

class UpdateProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gender_id: '',
      goal_id: '',
      birthday: '',
      weight: '',
      heightFeet: '',
      heightInches: '',
      activity_level_id: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  changeHandler(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit(event) {
    event.preventDefault();
    let heightFeet = this.state.heightFeet;
    let heightInches = this.state.heightInches;
    const height = (Number(heightFeet) * 12) + Number(heightInches);
    let updateObject = {
      gender_id: this.state.gender_id,
      goal_id: this.state.goal_id,
      birthday: this.state.birthday,
      weight: this.state.weight,
      height: height,
      activity_level_id: this.state.activity_level_id
    };
    this.props.updateProfile(this.props.user.user_id, { ...updateObject });
    this.props.history.push('/dashboard');
  };

  static getDerivedStateFromProps(props, state) {
    if (state.gender_id) return state.gender_id;
    if (state.goal_id) return state.goal_id;
    if (state.birthday) return state.birthday;
    if (state.weight) return state.weight;
    if (state.heightFeet) return state.heightFeet;
    if (state.heightInches) return state.heightInches;
    if (state.activity_level_id) return state.activity_level_id;

    const stateChanges = {};

    if (props.user.gender_id) {
      stateChanges.gender_id = props.user.gender_id;
    }
    if (props.user.goal_id) {
      stateChanges.goal_id = props.user.goal_id;
    }
    if (props.user.birthday) {
      stateChanges.birthday = props.user.birthday.split('T')[0];
    }
    if (props.user.weight) {
      stateChanges.weight = props.user.weight;
    }
    if (props.user.height) {
      stateChanges.heightFeet = Math.floor(props.user.height / 12);
      stateChanges.heightInches = props.user.height % 12;
    }
    if (props.user.activity_level_id) {
      stateChanges.activity_level_id = props.user.activity_level_id;
    }
    return stateChanges
  }

  render() {
    const activityOptions = this.props.activityLevels.map(activity_level => {
      return (
        <option key={activity_level.id} value={activity_level.id}>
          {activity_level.name}
        </option>
      );
    });

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

    return (

      <div id="updateProfileForm" >
        <form onSubmit={this.handleSubmit} >
          <div className="updateContainer">

            <div id="updateTitle">Profile Information</div>

            <div className="formGroup">
              <label htmlFor="profile_gender">Biological Gender:</label>
              <select
                name="gender_id"
                id="profile_gender"
                value={this.state.gender_id}
                onChange={this.changeHandler}
                required
              >
                {genderOptions}
              </select>
            </div>

            <div className="formGroup">
              <label htmlFor="birthday">Birthday:</label>
              <input
                type="date"
                id="profile_birthday"
                name="birthday"
                placeholder="Birthday"
                required
                value={this.state.birthday}
                onChange={this.changeHandler}
                autoFocus
              />
            </div>

            <div className="formGroup">
              <label htmlFor="weight">Weight(lbs):</label>
              <input
                type="number"
                id="profile_weight"
                name="weight"
                placeholder="Weight in pounds"
                required
                value={this.state.weight}
                onChange={this.changeHandler}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="heightFeet">Height(feet):</label>
              <input
                type="number"
                id="profile_height_feet"
                name="heightFeet"
                placeholder="Feet"
                required
                value={this.state.heightFeet}
                onChange={this.changeHandler}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="heightInches">Height(inches):</label>
              <input
                type="number"
                id="profile_height_inches"
                name="heightInches"
                placeholder="Inches"
                min="0"
                max="11"
                required
                value={this.state.heightInches}
                onChange={this.changeHandler}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="goal_id">Goal:</label>
              <select
                name="goal_id"
                id="profile_goal"
                value={this.state.goal_id}
                onChange={this.changeHandler}
                required
              >
                {goalOptions}
              </select>
            </div>

            <div className="formGroup">
              <label htmlFor="activity_level_id">Activity Level:</label>
              <select
                name="activity_level_id"
                id="activity_level"
                value={this.state.activity_level_id}
                onChange={this.changeHandler}
                required
              >
                {activityOptions}
              </select>
            </div>

            <div className="formGroup">
              <button type="submit" name="save" >Save</button>
            </div>

          </div>

          {/* <div id="update_profile_gender_container" className="select_container">
          </div>
          <br />
          <div id="update_birthday_container">
            <span>Birthday:</span>
            
          </div>
          <br />
          <div id="update_weight_container">
            <span>Weight in pounds:</span>
            
          </div>
          <br />
          <div id="update_profile_height_container">
            <div>Height:</div>
            <span>Feet:</span>
            
            <br />
            <span>Inches:</span>
            
            <br />
          </div>
          <br />
          <div id="update_profile_goal_container" className="select_container">
            <label htmlFor="profile_goal">Goal:</label>
            
          </div>
          <br /> */}
          {/* <div id="update_activity_level_container" className="select_container">
            <label htmlFor="activity_level">Activity level:</label>
          </div>
          <br /> */}

        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    genders: state.gender,
    goals: state.goal,
    activityLevels: state.activityLevel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (id, form) => {
      dispatch(updateProfile(id, form));
    }
  }
};

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(UpdateProfileForm));
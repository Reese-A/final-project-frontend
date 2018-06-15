import React from 'react';
import { connect } from 'react-redux';
import { saveProfileForm } from '../../redux/actions/profile-form-actions';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genders: [],
      goals: [],
      birthday: '',
      weight: null,
      heightFeet: null,
      heightInches: null,
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
    this.props.saveProfileForm({ ...this.state });
    this.props.previousPage();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.saveProfileForm({ ...this.state });
    this.props.nextPage();
  };

  componentDidMount() {
    console.log('profile props', this.props);
    this.setState({ ...this.props.profileForm });
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
    return (

      <div id="profile_form">
        <div id="profile_form_title">Tell us about yourself</div>
        <br/>  
        <form onSubmit={this.handleSubmit} >
          <div id="birthday_container">
            <span>Birthday:</span>
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
          <br />
          <div id="weight_container">
            <span>Weight in pounds:</span>
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
          <br />

          <div id="profile_height_container">
          <div>Height:</div>
            <span>Feet:</span>
            <input
              type="number"
              id="profile_height_feet"
              name="heightFeet"
              placeholder="Feet"
              required
              value={this.state.heightFeet}
              onChange={this.changeHandler}
            />
            <br />
          <span>Inches:</span>
            <input
              type="number"
              id="profile_height_inches"
              name="heightInches"
              placeholder="Inches"
              required
              value={this.state.heightInches}
              onChange={this.changeHandler}
            />
            <br />
          </div>
          <br/>
          <div id="profile_gender_container" className="select_container">
            <label htmlFor="profile_gender">Biological Gender:</label>
            <select
              name="gender"
              id="profile_gender"
              value={this.state.gender}
              onChange={this.changeHandler}
              required
            >
              {genderOptions}
              <option value="" selected disabled hidden>Choose here</option>
            </select>
          </div>
          <br/>
          <div id="profile_goal_container" className="select_container">
            <label htmlFor="profile_goal">Goal:</label>
            <select
              name="goal"
              id="profile_goal"
              value={this.state.goal}
              onChange={this.changeHandler}
              required
            >
              {goalOptions}
              <option value="" selected disabled hidden>Choose here</option>
            </select>
          </div>
          <br/>
          <button type="click" name="previous" onClick={this.previousPage}>Previous</button>
          <button type="submit" name="next" >Next</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    genders: state.gender,
    goals: state.goal,
    profileForm: state.registrationForm.profileForm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveProfileForm: (form) => {
      dispatch(saveProfileForm(form));
    }
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(ProfileForm);
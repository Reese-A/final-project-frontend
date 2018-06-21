import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { saveProfileForm } from '../../redux/actions/profile-form-actions';

import './ProfileForm.css';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gender_id: '',
      goal_id: '',
      birthday: '',
      weight: '',
      heightFeet: '',
      heightInches: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.useStandardValues = this.useStandardValues.bind(this);
  };

  changeHandler(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  previousPage(event) {
    event.preventDefault();
    this.props.saveProfileForm({ ...this.state });
    this.props.previousPage();
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.saveProfileForm({ ...this.state });
    this.props.nextPage();
  };

  componentDidMount() {
    this.setState({ ...this.props.profileForm });
  };

  useStandardValues(event) {

    event.preventDefault();
    const birthDate = Moment().subtract(35, 'years').format('YYYY-MM-DD');

    if (this.state.gender_id === "1") {
      this.setState({
        weight: 195,
        heightFeet: 5,
        heightInches: 10,
        goal_id: 1,
        birthday: birthDate
      }, () => {
        this.props.saveProfileForm({ ...this.state });
        this.props.nextPage();
      });
    } else if (this.state.gender_id === "2") {
      this.setState({
        weight: 166,
        heightFeet: 5,
        heightInches: 4,
        goal_id: 1,
        birthday: birthDate
      }, () => {
        this.props.saveProfileForm({ ...this.state });
        this.props.nextPage();
      });
    }
  };


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
      <div id="profileForm">

        <div id="profileFormImage">
          <div className="homeTitle">fitbyte</div>
        </div>

        <div id="profile_form">

          <form onSubmit={this.handleSubmit} >

            <div className="formGroup">
              <label htmlFor="gender_id">Biological Gender:</label>
              <select
                name="gender_id"
                id="gender_id"
                value={this.state.gender_id}
                onChange={this.changeHandler}
                required
              >
                <option value="" disabled>Choose here</option>
                {genderOptions}
              </select>
            </div>

            <div className="formGroup">
              <label htmlFor="birthday">Birthday:</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                required
                value={this.state.birthday}
                onChange={this.changeHandler}
                autoFocus
              />
            </div>

            <div className="formGroup">
              <label htmlFor="weight">Weight(lbs):</label>
              <input
                type="text"
                id="weight"
                name="weight"
                required
                value={this.props.weigth}
                onChange={this.changeHandler}
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
                onChange={this.changeHandler}
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
                onChange={this.changeHandler}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="goal_id">Goal:</label>
              <select
                name="goal_id"
                id="goal_id"
                value={this.state.goal_id}
                onChange={this.changeHandler}
                required
              >
                <option value="" disabled>Choose here</option>
                {goalOptions}
              </select>
            </div>

            <button type="click" name="standardValues" onClick={this.useStandardValues}>Use National Standard</button>
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
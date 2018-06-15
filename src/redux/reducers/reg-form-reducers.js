import { SAVE_ACCOUNT_FORM } from '../actions/account-form-actions';

import { SAVE_FITNESS_FORM } from '../actions/fitness-form-actions';

import { SAVE_PROFILE_FORM } from '../actions/profile-form-actions';

const initialState = {
  accountForm: {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  },
  profileForm: {
    birthday: '',
    weight: null,
    heightFeet: null,
    heightInches: null,
    gender: null,
    goal: null
  },
  fitnessForm: {
    activityLevel: null
  },

};

const registrationForm = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ACCOUNT_FORM:
      return {...state, accountForm: action.accountForm }
      // Object.assign({}, state, { accountForm: action.accountForm })
    case SAVE_PROFILE_FORM:
      return {...state, profileForm: action.profileForm }
    case SAVE_FITNESS_FORM:
      return {...state, fitnessForm: action.fitnessForm }
    default:
      return state;
  }
};

export default registrationForm;
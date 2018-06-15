
import { LOAD_GENDERS } from '../actions/gender-actions';

const initialState = [];

const gender = (state = initialState, action) => {
  switch (action.type) {
    case (LOAD_GENDERS):
      return [...action.genders]
    default:
      return state;
  }
}

export default gender;
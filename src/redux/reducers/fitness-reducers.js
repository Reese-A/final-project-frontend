import { GET_TOTAL_STEPS, GET_CALORIES_EXPENDED } from '../actions/fitness-actions';

const initialState = {
    totalSteps: '',
    caloriesExpended: ''
};

const fitness = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOTAL_STEPS:
      return {...state, totalSteps: action.totalSteps }
    case GET_CALORIES_EXPENDED:
      return {...state, caloriesExpended: action.caloriesExpended }
    default:
      return state;
  }
};

export default fitness;

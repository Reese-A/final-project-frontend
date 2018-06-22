import { LOAD_CONSUMPTION } from '../actions/dishes-actions';

const initialState = {
  calories: '',
  fat: '',
  carb: '',
  protein: '',
  calTracker: []
};

const consumption = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONSUMPTION:
      return action.totals;
    default:
      return state;
  }
};

export default consumption;

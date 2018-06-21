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
      if (!state.calTracker.includes(action.totals.calories)) {
        state.calTracker.push(action.totals.calories);
      }
      return { ...action.totals, calTracker: [...state.calTracker] };
    default:
      return state;
  }
};

export default consumption;

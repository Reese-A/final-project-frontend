import {
  LOAD_DAILY_CONSUMPTION,
  UPDATE_DAILY_CONSUMPTION
} from '../actions/daily-actions';

const initialState = {};

const daily = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DAILY_CONSUMPTION:
      return action.dailyConsumption;
    case UPDATE_DAILY_CONSUMPTION:
      return action.dailyConsumption;
    default:
      return state;
  }
};

export default daily;

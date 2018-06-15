
import { LOAD_ACTIVITY_LEVELS } from '../actions/activity-level-actions';

const initialState = [];

const activityLevel = (state = initialState, action) => {
  switch (action.type) {
    case (LOAD_ACTIVITY_LEVELS):
      return [...action.activityLevels]
    default:
      return state;
  }
}

export default activityLevel;
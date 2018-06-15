
import { LOAD_GOALS } from '../actions/goal-actions';

const initialState = [];

const goal = (state = initialState, action) => {
  switch (action.type) {
    case (LOAD_GOALS):
      return [...action.goals]
    default:
      return state;
  }
}

export default goal;
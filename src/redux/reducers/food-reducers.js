import { CREATE_DISH } from '../actions/food-actions';

const initialState = [];

const food = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DISH:
      return [...state, action.dish];
    default:
      return state;
  }
};

export default food;

import { LOAD_USER_DISHES } from '../actions/dishes-actions';

const initialState = {};

const dishes = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_DISHES:
      return action.dishes;
    default:
      return state;
  }
};

export default dishes;

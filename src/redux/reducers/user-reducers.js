import { LOAD_USER } from '../actions/user-actions';

// const initialState = {};

const user = (state = { email: '', firstname: '', lastname: '' }, action) => {
  switch (action.type) {
    case LOAD_USER:
      return action.user;
    default:
      return state;
  }
};

export default user;

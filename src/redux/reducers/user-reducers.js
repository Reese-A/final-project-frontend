import { LOAD_USER, LOGIN_USER } from '../actions/user-actions';

const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, ...action.user };
    case LOGIN_USER:
      return { ...state, ...action.user }
    default:
      return state;
  }
};

export default user;

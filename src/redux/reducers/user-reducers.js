import { LOAD_USER, LOGIN_USER, LOGOUT_USER } from '../actions/user-actions';

const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, ...action.user };
    case LOGIN_USER:
      if (action.err) {
        return { err: action.err.message };
      }
      return { ...state, ...action.user };
    case LOGOUT_USER:
      return { ...action.user };
    default:
      return state;
  }
};

export default user;

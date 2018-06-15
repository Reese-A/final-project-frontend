import { LOAD_USER, LOGIN_USER } from '../actions/user-actions';

const initialState = {
  online: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, user: action.user };
    case LOGIN_USER:
      return { ...state, online: action.online }
    default:
      return state;
  }
};

export default user;

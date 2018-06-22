import { UPDATE_PROFILE } from '../actions/settings-actions';

const initialState = {};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { ...state, ...action.user};
    default:
      return state;
  }
};

export default settings;

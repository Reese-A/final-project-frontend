export const LOAD_USER = 'LOAD_USER';

export const loadUser = () => {
  return dispatch => {
    return dispatch({
      type: LOAD_USER,
      user: {}
    });
  };
};

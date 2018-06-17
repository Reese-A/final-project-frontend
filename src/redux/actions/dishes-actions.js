export const LOAD_USER_DISHES = 'LOAD_USER_DISHES';

export const loadUserDishes = () => {
  return dispatch => {
    return fetch('/api/users/dishes', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(dishes => {
        console.log(dishes);
        dispatch({ type: LOAD_USER_DISHES, dishes });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

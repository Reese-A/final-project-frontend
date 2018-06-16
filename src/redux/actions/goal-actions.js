export const LOAD_GOALS = 'LOAD_GOALS';

export const loadGoals = () => {
  return dispatch => {
    return fetch('/api/goals', { credentials: 'same-origin' })
    .then(res => {
      return res.json();
    })
    .then(goals => {
      dispatch({
        type: LOAD_GOALS,
        goals
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
}

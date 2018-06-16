export const LOAD_ACTIVITY_LEVELS = 'LOAD_ACTIVITY_LEVELS';

export const loadActivityLevels = () => {
  return dispatch => {
    return fetch('/api/activitylevels', { credentials: 'same-origin' }
  )
    .then(res => {
      return res.json();
    })
    .then(activityLevels => {
      dispatch({
        type: LOAD_ACTIVITY_LEVELS,
        activityLevels
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
}

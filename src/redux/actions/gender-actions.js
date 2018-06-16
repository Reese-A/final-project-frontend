export const LOAD_GENDERS = 'LOAD_GENDERS';

export const loadGenders = () => {
  return dispatch => {
    return fetch('/api/genders', { credentials: 'same-origin' }
  )
    .then(res => {
      return res.json();
    })
    .then(genders => {
      dispatch({
        type: LOAD_GENDERS,
        genders
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
}

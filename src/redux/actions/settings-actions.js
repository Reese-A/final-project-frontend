export const LOGIN_GOOGLE = 'LOGIN_GOOGLE';

export const loginGoogle = (auth) => {
  return dispatch => {
    return fetch('/api/oauth/google/token', 
    { method: 'PUT',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(auth),
      credentials: 'same-origin'
    })
  .then(res => {
    return res.json();
  })
  .then(auth => {
    dispatch({
      type: LOGIN_GOOGLE,
      auth
    })
  })
  .catch(err => {
    console.log(err);
  })
  }
}

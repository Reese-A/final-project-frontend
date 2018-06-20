export const POST_REGISTRATION = 'POST_REGISTRATION';

export const postRegistration = (form) => {
  return dispatch => {
    return fetch('/api/users', 
    { 
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
      credentials: 'same-origin' 
    })
    .then(res => {
      console.log(res.body);
      return res.json(); 
    })
    .then(registration => {
      dispatch({
        type: POST_REGISTRATION,
        registration
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
};

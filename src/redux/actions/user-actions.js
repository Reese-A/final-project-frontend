export const LOAD_USER = 'LOAD_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const loadUser = (id) => {
  return (dispatch) => {
    return fetch(`/api/users/${id}`)
      .then((data) => {
        return data.json();
      })
      .then((user) => {
        //error handle here (backend --> frontend, display based on status)

        dispatch({
          type: LOAD_USER,
          user
        })
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
  };
};

export const loginUser = (user) => {
  return (dispatch) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
      .then((user) => {
        console.log(user);
        //error handle here

        dispatch({
          type: LOGIN_USER,
          online: true,
        })
      })
  }
}
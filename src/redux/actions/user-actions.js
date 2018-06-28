export const LOAD_USER = 'LOAD_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOAD_USER_DISHES = 'LOAD_USER_DISHES';

export const loadUser = id => {
  return dispatch => {
    return fetch(`/api/users/${id}`, { credentials: 'same-origin' })
      .then(data => {
        return data.json();
      })
      .then(user => {
        //error handle here (backend --> frontend, display based on status)
        dispatch({ type: LOAD_USER, user });
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  };
};

export const loginUser = (user, history) => {
  return dispatch => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
      .then(res => res.json())
      .then(user => {
        //error handle here
        user.online = true;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({
          type: LOGIN_USER,
          user
        });

        history.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
        err.message = 'Incorrect Email or Password';
        dispatch({ type: LOGIN_USER, err });
      });
  };
};

export const logoutUser = () => {
  return dispatch => {
    return fetch('/api/users/logout', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(user => {
        //error handle here
        localStorage.removeItem('user');
        dispatch({
          type: LOGOUT_USER,
          user
        });
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  };
};

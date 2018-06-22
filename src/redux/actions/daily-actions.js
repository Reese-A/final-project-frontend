export const UPDATE_DAILY_CONSUMPTION = 'UPDATE_DAILY_CONSUMPTION';
export const LOAD_DAILY_CONSUMPTION = 'LOAD_DAILY_CONSUMPTION';

export const updateDaily = calories => {
  return dispatch => {
    return fetch('/api/dailyconsumption', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        calories: calories
      })
    })
      .then(res => res.json())
      .then(dailyConsumption => {
        console.log(dailyConsumption);
        dispatch({
          type: UPDATE_DAILY_CONSUMPTION,
          dailyConsumption
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const loadDaily = () => {
  return dispatch => {
    return fetch('api/dailyconsumption', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(dailyConsumption => {
        console.log(dailyConsumption);
        dispatch({
          type: LOAD_DAILY_CONSUMPTION,
          dailyConsumption
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

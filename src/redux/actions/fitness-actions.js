
import Moment from 'moment';
export const GET_CALORIES_EXPENDED = 'GET_CALORIES_EXPENDED';
export const GET_TOTAL_STEPS = 'GET_TOTAL_STEPS';

const endTimeMillis = Moment().valueOf();
const startTimeMillis = Moment().startOf('day').format('x');
const timePeriod = endTimeMillis - startTimeMillis;

let calBody = {
  "aggregateBy": [{
    "dataTypeName": "com.google.calories.expended",
    "dataSourceId": "derived:com.google.calories.expended:com.google.android.gms:platform_calories_expended"
  }],
  "bucketByTime": { "durationMillis": timePeriod },
  "startTimeMillis": startTimeMillis,
  "endTimeMillis": endTimeMillis
};

export const getCaloriesExpended = () => {
  return dispatch => {
    return fetch('/api/oauth/google/token', {
      credentials: 'same-origin' })
      .then(res => {
       return res.json()
      })
      .then(token => {
        return fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(calBody)
        })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.bucket[0].dataset[0].point.length === 0) {
            const caloriesExpended = "No calories burned yet today.";
            dispatch({
              type: GET_CALORIES_EXPENDED,
              caloriesExpended
            })
          } else {
            const caloriesExpended = data.bucket[0].dataset[0].point[0].value[0].fpVal;
            dispatch({
              type: GET_CALORIES_EXPENDED,
              caloriesExpended
            })
          }
        })
        .catch(err => {
          console.log(err);
          err.message = 'Please reconnect your Fit account in Settings.';
          dispatch({ type: GET_CALORIES_EXPENDED, err})
        })
      })
  }
};

let stepBody = {
  "aggregateBy": [{
    "dataTypeName": "com.google.step_count.delta",
    "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
  }],
  "bucketByTime": { "durationMillis": timePeriod },
  "startTimeMillis": startTimeMillis,
  "endTimeMillis": endTimeMillis
}

export const getTotalSteps = () => {
  return dispatch => {
    return fetch('/api/oauth/google/token', {
      credentials: 'same-origin' })
      .then(res => {
       return res.json()
      })
      .then(token => {
    return fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(stepBody)
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.bucket[0].dataset[0].point.length === 0) {
        const totalSteps = "No steps recorded yet today.";
        dispatch({
          type: GET_TOTAL_STEPS,
          totalSteps
        })
      }else{
        const totalSteps = data.bucket[0].dataset[0].point[0].value[0].intVal;
        dispatch({
          type: GET_TOTAL_STEPS,
          totalSteps
        })
      }
    })
    .catch(err => {
      console.log(err);
      err.message = 'Please reconnect your Fit account in Settings.';
      dispatch({ type: GET_CALORIES_EXPENDED, err})
    })
  })
  }
};


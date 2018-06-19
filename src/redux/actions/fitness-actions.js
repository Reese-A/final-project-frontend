
import Moment from 'moment';
export const GET_CALORIES_EXPENDED = 'GET_CALORIES_EXPENDED';
export const GET_TOTAL_STEPS = 'GET_TOTAL_STEPS';

let endTimeMillis = Moment().format(x);
let startTimeMillis = endTimeMillis - 86400000;

export const getCaloriesExpended = () => {
  return dispatch => {
    return fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
          "aggregateBy": [{
            "dataTypeName": "com.google.calories.expended",
            "dataSourceId": "derived:com.google.calories.expended:com.google.android.gms:platform_calories_expended"
          }],
          "bucketByTime": { "durationMillis": 86400000 },
          "startTimeMillis": startTimeMillis,
          "endTimeMillis": endTimeMillis
      }
    })
    .then(res => {
      console.log(res.body);
      return res.json();
    })
    .then(caloriesExpended => {
      dispatch({
        type: GET_CALORIES_EXPENDED,
        caloriesExpended
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
};

export const getTotalSteps = () => {
  return dispatch => {
    return fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        "aggregateBy": [{
          "dataTypeName": "com.google.step_count.delta",
          "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
        }],
        "bucketByTime": { "durationMillis": 86400000 },
        "startTimeMillis": startTimeMillis,
        "endTimeMillis": endTimeMillis
      }
    })
    .then(res => {
      console.log(res.body);
      return res.json();
    })
    .then(totalSteps => {
      dispatch({
        type: GET_TOTAL_STEPS,
        totalSteps
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
};


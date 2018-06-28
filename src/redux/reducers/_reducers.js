import { combineReducers } from 'redux';

import user from './user-reducers';
import gender from './gender-reducers';
import goal from './goal-reducers';
import activityLevel from './activity-level-reducers';
import registrationForm from './reg-form-reducers';
import { dishes, newDish } from './dishes-reducers';
import food from './food-reducers';
import consumption from './consumption_reducers';
import fitness from './fitness-reducers';
import settings from './settings-reducers';
import daily from './daily-reducers';

const appReducer = combineReducers({
  user,
  gender,
  goal,
  activityLevel,
  registrationForm,
  dishes,
  newDish,
  food,
  consumption,
  fitness,
  settings,
  daily
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
